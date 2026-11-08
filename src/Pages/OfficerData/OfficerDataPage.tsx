import { useState, useMemo, useCallback } from 'react';
import { createColumnHelper } from '@tanstack/react-table';

import { useOfficerData } from '../../Hooks/OfficerDataHook/useOfficerData';
import type {
  IOfficerData,
  IOfficerDataShow,
} from '../../Interface/IOfficerData';

import CrudBtn from '../../Components/Buttons/CrudBtn2';
import AdditionalBtn from '../../Components/Buttons/AdditionalBtn';
import PageTitle from '../../Components/Text/PageTitle';
import OfficerDataModel from '../../Components/Popup/OfficerModel/OfficerDataModel';
import OfficerDataModelFull from '../../Components/Popup/OfficerModel/OfficerDataModelFull';
// استيراد مودال تفاصيل طلبات الخدمة (تأكد من مطابقة مسار الملف لديك)
import ServiceDetailByTowerIdModal from '../../Components/Popup/ServiceDetailModel/ServiceDetailByTowerIdModel';
import MultiDataTable from '../../Components/Tables/MultiDataTable';
import { getOfficerDataById } from '../../Api/OfficerData';
import useConfirmOfficer from '../../Hooks/OfficerDataHook/useConfirmedOfficer';
import Swal from 'sweetalert2';

const columnHelper = createColumnHelper<IOfficerDataShow>();

export default function OfficerDataPage() {
  const { data: officerDatas = [], isLoading } = useOfficerData();
  const { mutate: confirmOfficer, isPending: isConfirming } =
    useConfirmOfficer();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOfficerData, setSelectedOfficerData] =
    useState<IOfficerData | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  //-----------------------------------------------------------------
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);
  const [selectedFullOfficerData, setSelectedFullOfficerData] =
    useState<IOfficerData | null>(null);
  //-----------------------------------------------------------------
  // State خاص بمودال طلبات الخدمة الأرضية
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedRequestFlight, setSelectedRequestFlight] = useState<{
    towerId: number | null;
    flightNo: string | null;
  }>({ towerId: null, flightNo: null });
  //-----------------------------------------------------------------

  const handleConfirm = useCallback(
    (flightRow: IOfficerDataShow) => {
      const targetId = flightRow.towerDataId ?? flightRow.id;
      if (!targetId) return;

      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to confirm this flight?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Confirm',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          confirmOfficer(targetId, {
            onSuccess: () => {
              Swal.fire({
                title: 'Confirmed!',
                text: 'Flight confirmed successfully.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
              });
            },
            onError: (error) => {
              console.error('Flight confirmation failed:', error);
              Swal.fire({
                title: 'Error!',
                text: 'An error occurred while confirming the flight. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            },
          });
        }
      });
    },
    [confirmOfficer],
  );

  const handleEdit = useCallback((flightRow: IOfficerDataShow) => {
    const preparedData: Partial<IOfficerData> & Record<string, unknown> = {
      towerDataId: flightRow.towerDataId ?? flightRow.id,
      airLineId: flightRow.airlineId,
      flightNoName: flightRow.flightNo,
      airportIdTo: flightRow.airportTo,
      date: flightRow.date,
      fidsFlightId: flightRow.id,
    };

    setSelectedOfficerData(preparedData as unknown as IOfficerData);
    setModalMode('add');
    setIsModalOpen(true);
  }, []);

  const handleEditFull = useCallback(async (towerDataId: number) => {
    try {
      const fullData = await getOfficerDataById(towerDataId);
      setSelectedFullOfficerData(fullData);
      setIsFullModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch officer data:', error);
    }
  }, []);

  // دالة فتح مودال طلبات الخدمة الخاصة بالرحلة
  const handleRequest = useCallback((flightRow: IOfficerDataShow) => {
    setSelectedRequestFlight({
      towerId: flightRow.towerDataId ?? flightRow.id,
      flightNo: flightRow.flightNo ?? null,
    });
    setIsRequestModalOpen(true);
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '#',
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor('flightNo', {
        header: 'Flight No',
        cell: (info) => info.getValue() || '—',
      }),
      columnHelper.accessor('airlineNameAr', {
        header: 'Airline',
        cell: (info) =>
          info.getValue() || info.row.original.airlineNameEn || '—',
      }),
      columnHelper.accessor('date', {
        header: 'Date',
        cell: (info) => info.getValue() || '—',
      }),
      columnHelper.accessor('time', {
        header: 'Time',
        cell: (info) => info.getValue() || '—',
      }),
      columnHelper.accessor('airportFromNameAr', {
        header: 'From',
        cell: (info) =>
          info.getValue() || info.row.original.airportFromNameEn || '—',
      }),
      columnHelper.accessor('airportToNameAr', {
        header: 'To',
        cell: (info) =>
          info.getValue() || info.row.original.airportToNameEn || '—',
      }),

      columnHelper.accessor('status', {
        id: 'status',
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();

          if (status === 5) {
            return (
              <div className="flex justify-center items-center">
                <img
                  src="/OperationStatus/takeOffAndLanding.png"
                  alt="Takeoff Success"
                  className="w-7 h-7 object-contain"
                  title="Landed & Taken off successfully"
                />
              </div>
            );
          }
          if (status === 1) {
            return (
              <div className="flex justify-center items-center">
                <img
                  src="/OperationStatus/waiting.png"
                  alt="Waiting "
                  className="w-7 h-7 object-contain"
                  title="Waiting"
                />
              </div>
            );
          }
          if (status === 4) {
            return (
              <div className="flex justify-center items-center">
                <img
                  src="/OperationStatus/landingSuccess.png"
                  alt="Landing "
                  className="w-7 h-7 object-contain"
                  title="Landed Only"
                />
              </div>
            );
          }

          if (status === null) {
            return <div className="flex justify-center items-center">_</div>;
          }

          if (status && [2, 3].includes(status)) {
            return (
              <div className="flex justify-center items-center">
                <img
                  src="/OperationStatus/takeOffSuccess.png"
                  alt="Plane Waiting"
                  className="w-7 h-7 object-contain"
                  title="Waiting"
                />
              </div>
            );
          }

          return <span className="flex justify-center text-gray-400">—</span>;
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: () => <i className="fa fa-cogs"></i>,

        cell: (info) => {
          const rowData = info.row.original;

          const renderMainAction = () => {
            if (rowData.status === 5 && rowData.isOfficerConfirmed) {
              return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
                  <svg
                    className="w-4 h-4 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Confirmed
                </span>
              );
            }

            if (rowData.status === 5 && !rowData.isOfficerConfirmed) {
              return (
                <CrudBtn
                  text={isConfirming ? 'Confirming...' : 'Confirm'}
                  btnType="save"
                  disabled={isConfirming}
                  fun={() => handleConfirm(rowData)}
                />
              );
            }

            if (rowData.isConsumed) {
              return (
                <CrudBtn
                  text="edit"
                  btnType="edit"
                  fun={() => handleEditFull(rowData.towerDataId ?? rowData.id)}
                />
              );
            }

            if (rowData.isOpen) {
              return (
                <CrudBtn
                  text="add"
                  btnType="create"
                  fun={() => handleEdit(rowData)}
                />
              );
            }

            return (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200 text-xs font-medium whitespace-nowrap">
                <i className="fa fa-lock text-gray-400"></i>
                Flight Not Opened
              </span>
            );
          };

          return (
            <div className="flex items-center justify-center gap-2">
              {renderMainAction()}

              {/* استدعاء handleRequest لفتح نافذة تفاصيل الطلبات */}
              {rowData.isAnyRequestNotAccepted === true && (
                <AdditionalBtn
                  text="طلب!"
                  btnType="alert"
                  fun={() => handleRequest(rowData)}
                />
              )}
            </div>
          );
        },

        enableSorting: false,
      }),
    ],
    [handleEdit, handleEditFull, handleConfirm, handleRequest, isConfirming],
  );

  return (
    <>
      <OfficerDataModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOfficerData(null);
        }}
        mode={modalMode}
        initialData={selectedOfficerData ?? undefined}
      />

      <OfficerDataModelFull
        isOpen={isFullModalOpen}
        onClose={() => {
          setIsFullModalOpen(false);
          setSelectedFullOfficerData(null);
        }}
        initialData={selectedFullOfficerData}
      />

      {/* نافذة تفاصيل طلبات الخدمة الأرضية */}
      <ServiceDetailByTowerIdModal
        isOpen={isRequestModalOpen}
        onClose={() => {
          setIsRequestModalOpen(false);
          setSelectedRequestFlight({ towerId: null, flightNo: null });
        }}
        towerId={selectedRequestFlight.towerId}
        flightNo={selectedRequestFlight.flightNo}
        userRole="officer"
        // onAcceptOfficer={(detailId) => {
        //   console.log('قبول الطلب رقم:', detailId);
        //   // يمكنك هنا استدعاء الـ Mutation الخاصة بـ AcceptOfficer عند تجهيزها
        // }}
      />

      <div className="flex justify-between items-center mb-4">
        <div></div>
        <PageTitle text=" Officer Data" />
      </div>

      <MultiDataTable
        data={officerDatas}
        columns={columns}
        isLoading={isLoading}
      />
    </>
  );
}

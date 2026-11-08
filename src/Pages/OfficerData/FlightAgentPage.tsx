import { useState, useMemo, useCallback } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useGetOfficerDataByAirlineId } from '../../Hooks/OfficerDataHook/useGetOfficerDataByAirlineId';

import type {
  IOfficerData,
  IOfficerDataShow,
} from '../../Interface/IOfficerData';

import { getOfficerDataById } from '../../Api/OfficerData';
import CrudBtn from '../../Components/Buttons/CrudBtn2';
import PageTitle from '../../Components/Text/PageTitle';
import OfficerDataModel from '../../Components/Popup/OfficerModel/OfficerDataModel';
import OfficerDataModelFull from '../../Components/Popup/OfficerModel/OfficerDataModelFull';
import ServiceRequestModal from '../../Components/Popup/ServiceDetailModel/ServiceRequestModal';

import MultiDataTable from '../../Components/Tables/MultiDataTable';

const columnHelper = createColumnHelper<IOfficerDataShow>();
export default function FlightAgentPage() {
  const navigate = useNavigate();
  const handleViewDetails = useCallback(
    (rowData: IOfficerDataShow & { towerDataId?: number | null }) => {
      const towerId = rowData.towerDataId ?? rowData.id;
      if (towerId) {
        navigate(`/officer-details/${towerId}`);
      }
    },
    [navigate],
  );
  // =================================================
  // 1. جلب بيانات الرحلات
  // =================================================

  const { data: officerDatas = [], isLoading } =
    useGetOfficerDataByAirlineId(52);

  // =================================================
  // 2. Officer Data Modal
  // =================================================

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedOfficerData, setSelectedOfficerData] =
    useState<IOfficerData | null>(null);

  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  // =================================================
  // 3. Officer Data Full Modal
  // =================================================

  const [isFullModalOpen, setIsFullModalOpen] = useState(false);

  const [selectedFullOfficerData, setSelectedFullOfficerData] =
    useState<IOfficerData | null>(null);

  // =================================================
  // 4. Service Request Modal
  // =================================================

  const [isServiceRequestModalOpen, setIsServiceRequestModalOpen] =
    useState(false);

  const [selectedFlightForRequest, setSelectedFlightForRequest] =
    useState<IOfficerDataShow | null>(null);

  // تحديد نوع العملية Add أو Edit
  const [serviceRequestMode, setServiceRequestMode] = useState<'add' | 'edit'>(
    'add',
  );

  // =================================================
  // 5. تأكيد الرحلة
  // =================================================

  // =================================================
  // 6. فتح Officer Data Modal
  // =================================================

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

  // =================================================
  // 7. فتح Officer Data Full Modal
  // =================================================

  const handleEditFull = useCallback(async (towerDataId: number) => {
    try {
      const fullData = await getOfficerDataById(towerDataId);

      setSelectedFullOfficerData(fullData);

      setIsFullModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch officer data:', error);

      Swal.fire('Error', 'Failed to load officer data.', 'error');
    }
  }, []);

  // =================================================
  // 8. فتح Service Request Modal - ADD
  // =================================================

  const handleAddRequest = useCallback((flightRow: IOfficerDataShow) => {
    // لا نستخدم id بديلاً عن towerDataId
    if (flightRow.towerDataId == null) {
      Swal.fire('تنبيه', 'معرف TowerData غير موجود لهذه الرحلة.', 'warning');

      return;
    }

    setServiceRequestMode('add');

    setSelectedFlightForRequest(flightRow);

    setIsServiceRequestModalOpen(true);
  }, []);

  // =================================================
  // 9. فتح Service Request Modal - EDIT
  // =================================================

  const handleEditRequest = useCallback((flightRow: IOfficerDataShow) => {
    if (flightRow.towerDataId == null) {
      Swal.fire('تنبيه', 'معرف TowerData غير موجود لهذه الرحلة.', 'warning');

      return;
    }

    setServiceRequestMode('edit');

    setSelectedFlightForRequest(flightRow);

    setIsServiceRequestModalOpen(true);
  }, []);

  // =================================================
  // 10. إغلاق Service Request Modal
  // =================================================

  const handleCloseServiceRequest = useCallback(() => {
    setIsServiceRequestModalOpen(false);

    setSelectedFlightForRequest(null);
  }, []);

  // =================================================
  // 11. Table Columns
  // =================================================

  const columns = useMemo(
    () => [
      // ID
      columnHelper.accessor('id', {
        header: '#',
        cell: (info) => info.getValue(),
      }),

      // Flight Number
      columnHelper.accessor('flightNo', {
        header: 'Flight No',
        cell: (info) => info.getValue() || '—',
      }),

      // Airline
      columnHelper.accessor('airlineNameAr', {
        header: 'Airline',
        cell: (info) =>
          info.getValue() || info.row.original.airlineNameEn || '—',
      }),

      // Date
      columnHelper.accessor('date', {
        header: 'Date',
        cell: (info) => info.getValue() || '—',
      }),

      // Time
      columnHelper.accessor('time', {
        header: 'Time',
        cell: (info) => info.getValue() || '—',
      }),

      // Airport From
      columnHelper.accessor('airportFromNameAr', {
        header: 'From',
        cell: (info) =>
          info.getValue() || info.row.original.airportFromNameEn || '—',
      }),

      // Airport To
      columnHelper.accessor('airportToNameAr', {
        header: 'To',
        cell: (info) =>
          info.getValue() || info.row.original.airportToNameEn || '—',
      }),

      // =================================================
      // Flight Status
      // =================================================

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
                  alt="Waiting"
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
                  alt="Landing"
                  className="w-7 h-7 object-contain"
                  title="Landed Only"
                />
              </div>
            );
          }

          if (status == null) {
            return <div className="flex justify-center items-center">_</div>;
          }

          if (status === 2 || status === 3) {
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

      // =================================================
      // Actions Column
      // =================================================

      columnHelper.display({
        id: 'actions',

        header: () => <i className="fa fa-cogs"></i>,

        cell: (info) => {
          const rowData = info.row.original;

          // ---------------------------------------------
          // Main Action
          // ---------------------------------------------

          const renderMainAction = () => {
            // 1. إذا أكد الضابط الرحلة، لا يُسمح للوكيل بالتعديل وتظهر شارة التأكيد فقط
            if (rowData.isOfficerConfirmed) {
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

            // 2. الرحلة مستهلكة (ولم يؤكدها الضابط بعد) -> يُسمح بالتعديل
            if (rowData.isConsumed) {
              return (
                <div className="flex items-center justify-center gap-2">
                  <CrudBtn
                    text="edit"
                    btnType="edit"
                    fun={() =>
                      handleEditFull(rowData.towerDataId ?? rowData.id)
                    }
                  />
                </div>
              );
            }

            // 3. الرحلة مفتوحة (ولم يؤكدها الضابط بعد)
            if (rowData.isOpen) {
              return (
                <CrudBtn
                  text="add"
                  btnType="create"
                  fun={() => handleEdit(rowData)}
                />
              );
            }

            // 4. الرحلة غير مفتوحة
            return (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200 text-xs font-medium whitespace-nowrap">
                <i className="fa fa-lock text-gray-400"></i>
                Flight Not Opened
              </span>
            );
          };
          // ---------------------------------------------
          // عرض الأزرار
          // ---------------------------------------------

          return (
            <div className="flex items-center justify-center gap-2">
              {/* الزر الأساسي */}
              {renderMainAction()}

              {/* 1. حالة الإضافة: أقل من 1 */}
              {rowData.isConsumed && (rowData.requestStatus ?? 0) < 1 && (
                <CrudBtn
                  btnType="addCar"
                  fun={() => handleAddRequest(rowData)}
                  customClass="p-2 text-base"
                />
              )}

              {/* 2. حالة التعديل: يساوي 1 */}
              {rowData.isConsumed && rowData.requestStatus === 1 && (
                <CrudBtn
                  btnType="editCar"
                  fun={() => handleEditRequest(rowData)}
                  customClass="p-1.5 text-xs"
                />
              )}

              {/* 3. حالة قبول الطلب: يساوي 2 */}
              {rowData.isConsumed && rowData.requestStatus === 2 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm whitespace-nowrap">
                  <i className="fa-solid fa-check-circle text-emerald-600"></i>
                  تم قبول الطلب
                </span>
              )}

              {/* 4. زر التفاصيل في النهاية */}
              {rowData.isConsumed && (
                <CrudBtn
                  btnType="details"
                  title="عرض التفاصيل"
                  fun={() => handleViewDetails(rowData)}
                  customClass="p-2 text-xs"
                />
              )}
            </div>
          );
        },

        enableSorting: false,
      }),
    ],

    [
      handleEdit,
      handleEditFull,
      handleAddRequest,
      handleEditRequest,
      handleViewDetails, // <-- أضفها هنا
    ],
  );

  // =================================================
  // 12. Main Render
  // =================================================

  return (
    <>
      {/* Officer Data Modal */}

      <OfficerDataModel
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOfficerData(null);
        }}
        mode={modalMode}
        initialData={selectedOfficerData ?? undefined}
      />

      {/* Officer Data Full Modal */}

      <OfficerDataModelFull
        isOpen={isFullModalOpen}
        onClose={() => {
          setIsFullModalOpen(false);
          setSelectedFullOfficerData(null);
        }}
        initialData={selectedFullOfficerData}
      />

      {/* ===========================================
          Service Request Modal
          =========================================== */}

      <ServiceRequestModal
        isOpen={isServiceRequestModalOpen}
        onClose={handleCloseServiceRequest}
        // تحديد العملية Add أو Edit
        mode={serviceRequestMode}
        // يجب إرسال TowerDataId وليس أي ID آخر
        towerId={selectedFlightForRequest?.towerDataId ?? null}
        flightNo={selectedFlightForRequest?.flightNo ?? null}
      />

      {/* Page Title */}

      <div className="flex justify-between items-center mb-4">
        <div></div>

        <PageTitle text=" Agent Data" />
      </div>

      {/* Flights Table */}

      <MultiDataTable
        data={officerDatas}
        columns={columns}
        isLoading={isLoading}
      />
    </>
  );
}

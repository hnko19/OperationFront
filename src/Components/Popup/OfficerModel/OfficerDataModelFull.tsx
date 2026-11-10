import { useState } from 'react';
import type { IOfficerData } from '../../../Interface/IOfficerData';
import { useUpdateOfficerData } from '../../../Hooks/OfficerDataHook/useUpdateOfficerData';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import BaseModal from '../BaseModal';
import { useHandlingAgentsCompany } from '../../../Hooks/HandlingAgentsCompanyHook/useHandlingAgentsCompany';
import { useFuelCompany } from '../../../Hooks/FuelCompanyHook/useFuelCompany';
import { useAircraftRegistration } from '../../../Hooks/AircraftRegistrationHook/useAircraftRegistration';
import { useAirlineFids } from '../../../Hooks/AirlineHook/useAirline';
import { useAirlineAgent } from '../../../Hooks/AirlineAgentHook/useAirlineAgent';
import QuickSelect from '../../DropdownList/QuickSelect';

interface OfficerDataModelFullProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: IOfficerData | null;
}

// 1. إضافة تبويب وكيل الطيران (agent)
type TabType = 'basic' | 'arrival' | 'departure' | 'agent';

// 2. إضافة aireLineAgentId
type OfficerFormData = Partial<IOfficerData> & {
  airLineId?: number;
  flightNoName?: string;
  aircraftRegId?: number;
  airportIdTo?: number;
  takeOffDate?: string | null;
  atd?: string | null;
  landingDate?: string | null;
  ata?: string | null;
  handlingAgentId?: number | null;
  fuelCompanyId?: number | null;
  fidsFlightId?: number;
  aireLineAgentId?: number | null;
};

// تعريف واجهة لوكيل الطيران لتجنب استخدام any
interface IAirlineAgentItem {
  id: number;
  nameAn?: string;
  nameEn?: string;
  nameAr?: string;
}

const formatDateForInput = (dateStr?: string | null) => {
  if (!dateStr || dateStr.trim() === '') return '';
  return dateStr.split('T')[0];
};

const parseDateToIso = (dateStr?: string | null): string | null => {
  if (!dateStr || dateStr.trim() === '') {
    return null;
  }
  const d = new Date(dateStr.includes('T') ? dateStr : `${dateStr}T00:00:00`);
  return isNaN(d.getTime()) ? null : d.toISOString();
};

const formatTimeForInput = (timeStr?: string | null): string => {
  if (!timeStr || timeStr.trim() === '') return '';
  if (timeStr.includes('T')) {
    return timeStr.split('T')[1].substring(0, 5);
  }
  return timeStr.trim().substring(0, 5);
};

const formatTimeToPayload = (timeVal?: string | null): string | null => {
  if (!timeVal || typeof timeVal !== 'string' || timeVal.trim() === '') {
    return null;
  }
  const cleanTime = timeVal.trim();
  if (cleanTime.length === 5) {
    return `${cleanTime}:00`;
  }
  return cleanTime;
};

const parseNullableNumber = (val?: number | string | null): number | null => {
  if (val === null || val === undefined || val === '' || Number(val) === 0) {
    return null;
  }
  return Number(val);
};

export default function OfficerDataModelFull({
  isOpen,
  onClose,
  initialData,
}: OfficerDataModelFullProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  const { mutate: updateOfficerData, isPending: updating } =
    useUpdateOfficerData();
  const { data: handlingAgentsCompanies } = useHandlingAgentsCompany();
  const { data: fuelCompanies } = useFuelCompany();
  const { data: aircraftRegistrations, isLoading: isLoadingAircraftReg } =
    useAircraftRegistration();
  const { data: airlineFids, isLoading: isLoadingAirlineFids } =
    useAirlineFids();

  // استدعاء بيانات وكيل شركة الطيران
  const { data: airlineAgents, isLoading: isLoadingAirlineAgents } =
    useAirlineAgent();

  // 3. إضافة خيار (لا يوجد) للسماح بـ null في Handling Agent
  const handlingAgentsCompaniesOptions = [
    { value: '', label: '-- لا يوجد (None) --' },
    ...(handlingAgentsCompanies?.map((t) => ({
      value: t.id,
      label: t.nameEn,
    })) ?? []),
  ];

  // 4. إضافة خيار (لا يوجد) للسماح بـ null في Fuel Company
  const fuelCompaniesOptions = [
    { value: '', label: '-- لا يوجد (None) --' },
    ...(fuelCompanies?.map((t) => ({
      value: t.id,
      label: t.nameEn,
    })) ?? []),
  ];

  const aircraftRegistrationsOptions =
    aircraftRegistrations?.map((t) => ({
      value: t.id,
      label: t.registration,
    })) ?? [];

  const airlineFidsOptions =
    airlineFids?.map((t) => ({
      value: t.Id,
      label: t.NameAr,
    })) ?? [];

  // مصفوفة وكيل شركة الطيران مع خيار (لا يوجد)
  const airlineAgentsOptions = [
    { value: '', label: '-- لا يوجد (None) --' },
    ...(airlineAgents?.map((t: IAirlineAgentItem) => ({
      value: t.id,
      label: t.nameAn ?? t.nameEn ?? t.nameAr ?? '',
    })) ?? []),
  ];

  const getFormValues = (data?: OfficerFormData | null) => ({
    id: data?.id ?? 0,
    towerDataId: data?.towerDataId ?? data?.towerData?.id ?? 0,
    date:
      formatDateForInput(data?.date) || new Date().toISOString().split('T')[0],
    isClaimCalculated: data?.isClaimCalculated ?? false,

    airLineId: data?.towerData?.airLineId ?? 0,
    flightNoName: data?.towerData?.flightNoName ?? '',
    aircraftRegId: data?.towerData?.aircraftRegId ?? 0,
    airportIdTo: data?.towerData?.airportIdTo ?? 0,
    fidsFlightId: data?.towerData?.fidsFlightId ?? 0,

    landingDate: formatDateForInput(data?.towerData?.landingDate),
    ata: formatTimeForInput(data?.towerData?.ata),
    disemb: data?.disemb ?? 0,
    disEmbInft: data?.disEmbInft ?? 0,
    freightLoadingImp: data?.freightLoadingImp ?? 0,
    normalMailLoadingImp: data?.normalMailLoadingImp ?? 0,
    rapidMailLoadingImp: data?.rapidMailLoadingImp ?? 0,

    takeOffDate: formatDateForInput(data?.towerData?.takeOffDate),
    atd: formatTimeForInput(data?.towerData?.atd),
    handlingAgentId:
      data?.handlingAgentId && data.handlingAgentId !== 0
        ? data.handlingAgentId
        : null,
    fuelCompanyId:
      data?.fuelCompanyId && data.fuelCompanyId !== 0
        ? data.fuelCompanyId
        : null,
    fuelLiter: data?.fuelLiter ?? 0,
    pax: data?.pax ?? 0,
    paxInter: data?.paxInter ?? 0,
    firstClassCount: data?.firstClassCount ?? 0,
    freightLoadingExp: data?.freightLoadingExp ?? 0,
    normalMailLoadingExp: data?.normalMailLoadingExp ?? 0,
    rapidMailLoadingExp: data?.rapidMailLoadingExp ?? 0,
    ambulanceCarCount: data?.ambulanceCarCount ?? 0,
    fireFightingCarCount: data?.fireFightingCarCount ?? 0,
    hasPushPack: data?.hasPushPack ?? true,

    // جلب وكيل شركة الطيران
    aireLineAgentId:
      data?.aireLineAgentId && data.aireLineAgentId !== 0
        ? data.aireLineAgentId
        : null,

    emb: data?.emb ?? 0,
    embInft: data?.embInft ?? 0,
    isNotUsedCupps: data?.isNotUsedCupps ?? false,
    isCurrentAccount: data?.isCurrentAccount ?? false,
  });

  const formik = useFormik({
    initialValues: getFormValues(initialData),
    enableReinitialize: true,
    // تم الاحتفاظ بالـ Validation الأصلي البسيط كما طلبت
    validationSchema: Yup.object({
      date: Yup.string().required('التاريخ مطلوب'),

      // 👈 إضافة التحقق لحقل Registration فقط
      aircraftRegId: Yup.number()
        .min(1, 'يجب اختيار تسجيل الطائرة (Registration)')
        .required('تسجيل الطائرة مطلوب'),

      flightNoName: Yup.string().nullable(),
      handlingAgentId: Yup.number().nullable(),
      fuelCompanyId: Yup.number().nullable(),
      aireLineAgentId: Yup.number().nullable(),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload: IOfficerData = {
        id: Number(values.id) || 0,
        towerDataId: Number(values.towerDataId) || 0,
        handlingAgentId: parseNullableNumber(values.handlingAgentId),
        fuelCompanyId: parseNullableNumber(values.fuelCompanyId),
        fuelLiter: Number(values.fuelLiter) || 0,
        pax: Number(values.pax) || 0,
        paxInter: Number(values.paxInter) || 0,
        firstClassCount: Number(values.firstClassCount) || 0,
        emb: Number(values.emb) || 0,
        embInft: Number(values.embInft) || 0,
        disemb: Number(values.disemb) || 0,
        disEmbInft: Number(values.disEmbInft) || 0,
        freightLoadingImp: Number(values.freightLoadingImp) || 0,
        normalMailLoadingImp: Number(values.normalMailLoadingImp) || 0,
        rapidMailLoadingImp: Number(values.rapidMailLoadingImp) || 0,
        freightLoadingExp: Number(values.freightLoadingExp) || 0,
        normalMailLoadingExp: Number(values.normalMailLoadingExp) || 0,
        rapidMailLoadingExp: Number(values.rapidMailLoadingExp) || 0,
        ambulanceCarCount: Number(values.ambulanceCarCount) || 0,
        fireFightingCarCount: Number(values.fireFightingCarCount) || 0,
        hasPushPack: Boolean(values.hasPushPack),
        isNotUsedCupps: Boolean(values.isNotUsedCupps),
        isCurrentAccount: Boolean(values.isCurrentAccount),
        date: values.date,
        trnycupps: Number(initialData?.trnycupps) || 0,

        // حفظ وكيل شركة الطيران من الـ Form
        aireLineAgentId: parseNullableNumber(values.aireLineAgentId),

        companyInfoId: Number(initialData?.companyInfoId) || 0,
        createdBy: initialData?.createdBy || 'system',
        creationDate: initialData?.creationDate ?? new Date().toISOString(),
        updatedBy: initialData?.updatedBy || 'system',
        updatingDate: new Date().toISOString(),
        isClaimCalculated: Boolean(values.isClaimCalculated),

        towerData: {
          id: Number(values.towerDataId) || 0,
          airLineId: Number(values.airLineId) || 0,
          aircraftRegId: Number(values.aircraftRegId) || 0,
          airportIdFrom: Number(initialData?.towerData?.airportIdFrom) || 1,
          airportIdTo: Number(values.airportIdTo) || 0,
          landingDate: parseDateToIso(values.landingDate),
          takeOffDate: parseDateToIso(values.takeOffDate),
          date: values.date,
          status: Number(initialData?.towerData?.status) || 0,
          ata: formatTimeToPayload(values.ata),
          atd: formatTimeToPayload(values.atd),
          tripTypeId: Number(initialData?.towerData?.tripTypeId) || 0,
          companyInfoId: Number(initialData?.towerData?.companyInfoId) || 0,
          fidsFlightId: Number(values.fidsFlightId) || 0,
          flightNoName: values.flightNoName ?? '',
          createdBy: initialData?.towerData?.createdBy || 'system',
          creationDate:
            initialData?.towerData?.creationDate ?? new Date().toISOString(),
          updatedBy: initialData?.towerData?.updatedBy || 'system',
          updatingDate: new Date().toISOString(),
        },
      };

      updateOfficerData(payload, {
        onSuccess: () => {
          resetForm();
          setActiveTab('basic');
          onClose();
          toast.success('تم تعديل بيانات الضابط بنجاح');
        },
        onError: () => toast.error('حدث خطأ أثناء تعديل البيانات'),
      });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setActiveTab('basic');
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="تعديل بيانات الضابط (البيانات المكتملة)"
    >
      {/* شريط التبويبات */}
      <div className="flex border-b border-gray-200 px-6 pt-2 bg-gray-50 rounded-t-lg">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`relative py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'basic'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          البيانات لأساسية
          {/* نقطة حمراء تظهر إذا كان هناك خطأ في Registration */}
          {formik.touched.aircraftRegId && formik.errors.aircraftRegId && (
            <span className="absolute top-1.5 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('arrival')}
          className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'arrival'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          بيانات الوصول
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('departure')}
          className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'departure'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          بيانات المغادرة
        </button>

        {/* التبويب الجديد: وكيل شركة الطيران */}
        <button
          type="button"
          onClick={() => setActiveTab('agent')}
          className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'agent'
              ? 'border-blue-600 text-blue-600 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          بيانات وكيل الطيران
        </button>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="w-full mx-auto bg-white rounded-b-lg px-6 py-4 flex flex-col space-y-4 max-h-[75vh] overflow-y-auto"
      >
        {/* ======================= Tab 1: Basic Information ======================= */}
        {activeTab === 'basic' && (
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 pb-20">
            {/* Flight No */}
            <div className="grid grid-cols-12 items-center gap-2">
              <label
                htmlFor="flightNoName"
                className="col-span-3 text-sm font-medium text-gray-700"
              >
                Flight No:
              </label>
              <input
                id="flightNoName"
                name="flightNoName"
                type="text"
                disabled
                value={formik.values.flightNoName}
                className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Date */}
            <div className="grid grid-cols-12 items-center gap-2">
              <label
                htmlFor="date"
                className="col-span-3 text-sm font-medium text-gray-700"
              >
                Date:
              </label>
              <input
                id="date"
                name="date"
                type="date"
                disabled
                value={formik.values.date}
                className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Airline */}
            <div className="grid grid-cols-12 items-center gap-2">
              <label
                htmlFor="airLineId"
                className="col-span-3 text-sm font-medium text-gray-700"
              >
                Airline:
              </label>
              <div className="col-span-9 w-full">
                {isLoadingAirlineFids ? (
                  <div className="w-full h-[38px] bg-gray-200 animate-pulse rounded-md flex items-center px-3 text-xs text-gray-400">
                    Loading...
                  </div>
                ) : (
                  <QuickSelect
                    options={airlineFidsOptions}
                    name="airLineId"
                    value={formik.values.airLineId}
                    disabled={true}
                    onChange={(val) => formik.setFieldValue('airLineId', val)}
                  />
                )}
              </div>
            </div>

            {/* Registration */}
            <div className="grid grid-cols-12 items-start gap-2">
              <label
                htmlFor="aircraftRegId"
                className="col-span-3 text-sm font-medium text-gray-700 pt-2"
              >
                Registration: <span className="text-red-500">*</span>
              </label>
              <div className="col-span-9 w-full flex flex-col">
                {isLoadingAircraftReg ? (
                  <div className="w-full h-[38px] bg-gray-200 animate-pulse rounded-md flex items-center px-3 text-xs text-gray-400">
                    Loading...
                  </div>
                ) : (
                  <div
                    className={
                      formik.touched.aircraftRegId &&
                      formik.errors.aircraftRegId
                        ? 'rounded-md ring-1 ring-red-500'
                        : ''
                    }
                  >
                    <QuickSelect
                      options={aircraftRegistrationsOptions}
                      name="aircraftRegId"
                      value={formik.values.aircraftRegId}
                      onChange={(val) => {
                        formik.setFieldValue(
                          'aircraftRegId',
                          val ? Number(val) : 0,
                        );
                        formik.setFieldTouched('aircraftRegId', true, false);
                      }}
                    />
                  </div>
                )}
                {/* عرض رسالة الخطأ */}
                {formik.touched.aircraftRegId &&
                  formik.errors.aircraftRegId && (
                    <span className="text-xs text-red-500 mt-1 font-medium">
                      {formik.errors.aircraftRegId}
                    </span>
                  )}
              </div>
            </div>

            {/* Airport To */}
            <div className="grid grid-cols-12 items-center gap-2">
              <label
                htmlFor="airportIdTo"
                className="col-span-3 text-sm font-medium text-gray-700"
              >
                To Airport:
              </label>
              <input
                id="airportIdTo"
                name="airportIdTo"
                type="number"
                disabled
                value={formik.values.airportIdTo}
                className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* ======================= Tab 2: Arrival Data ======================= */}
        {activeTab === 'arrival' && (
          <div className="flex flex-col space-y-4 pb-20">
            {/* قسم بيانات الرحلة */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-blue-700 mb-3 border-b pb-1.5">
                Flight Info
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {/* Landing Date */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="landingDate"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Landing Date:
                  </label>
                  <input
                    id="landingDate"
                    name="landingDate"
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.landingDate ?? ''}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* ATA */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="ata"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    ATA:
                  </label>
                  <input
                    id="ata"
                    name="ata"
                    type="time"
                    step="60"
                    dir="ltr"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ata ?? ''}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-left"
                  />
                </div>
              </div>
            </div>

            {/* قسم الخدمات */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-1.5">
                Services
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {/* Disembarkation */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="disemb"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Disembarkation:
                  </label>
                  <input
                    id="disemb"
                    name="disemb"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.disemb}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Infants In */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="disEmbInft"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Infants (Arr):
                  </label>
                  <input
                    id="disEmbInft"
                    name="disEmbInft"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.disEmbInft}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Freight Import */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="freightLoadingImp"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Freight Import:
                  </label>
                  <input
                    id="freightLoadingImp"
                    name="freightLoadingImp"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.freightLoadingImp}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Normal Mail Import */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="normalMailLoadingImp"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Normal Mail:
                  </label>
                  <input
                    id="normalMailLoadingImp"
                    name="normalMailLoadingImp"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.normalMailLoadingImp}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Rapid Mail Import */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="rapidMailLoadingImp"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Rapid Mail:
                  </label>
                  <input
                    id="rapidMailLoadingImp"
                    name="rapidMailLoadingImp"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rapidMailLoadingImp}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= Tab 3: Departure Data ======================= */}
        {activeTab === 'departure' && (
          <div className="flex flex-col space-y-4 pb-20">
            {/* قسم بيانات الرحلة */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-blue-700 mb-3 border-b pb-1.5">
                Flight Info
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {/* Take Off Date */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="takeOffDate"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Take Off Date:
                  </label>
                  <input
                    id="takeOffDate"
                    name="takeOffDate"
                    type="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.takeOffDate ?? ''}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* ATD */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="atd"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    ATD:
                  </label>
                  <input
                    id="atd"
                    name="atd"
                    type="time"
                    step="60"
                    dir="ltr"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.atd ?? ''}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-left"
                  />
                </div>
              </div>
            </div>

            {/* قسم الخدمات */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 border-b pb-1.5">
                Services
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {/* Handling Agent */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="handlingAgentId"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Handling Agent:
                  </label>
                  <div className="col-span-9 w-full">
                    <QuickSelect
                      options={handlingAgentsCompaniesOptions}
                      name="handlingAgentId"
                      value={formik.values.handlingAgentId ?? ''}
                      onChange={(val) =>
                        formik.setFieldValue('handlingAgentId', val || null)
                      }
                    />
                  </div>
                </div>

                {/* Fuel Company */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="fuelCompanyId"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Fuel Company:
                  </label>
                  <div className="col-span-9 w-full">
                    <QuickSelect
                      options={fuelCompaniesOptions}
                      name="fuelCompanyId"
                      value={formik.values.fuelCompanyId ?? ''}
                      onChange={(val) =>
                        formik.setFieldValue('fuelCompanyId', val || null)
                      }
                    />
                  </div>
                </div>

                {/* PAX */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="pax"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    PAX:
                  </label>
                  <input
                    id="pax"
                    name="pax"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pax}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* PAX Inter */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="paxInter"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    PAX Inter:
                  </label>
                  <input
                    id="paxInter"
                    name="paxInter"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.paxInter}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* First Class */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="firstClassCount"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    First Class:
                  </label>
                  <input
                    id="firstClassCount"
                    name="firstClassCount"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstClassCount}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Fuel (Liter) */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="fuelLiter"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Fuel (Liter):
                  </label>
                  <input
                    id="fuelLiter"
                    name="fuelLiter"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fuelLiter}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Freight Export */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="freightLoadingExp"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Freight Export:
                  </label>
                  <input
                    id="freightLoadingExp"
                    name="freightLoadingExp"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.freightLoadingExp}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Normal Mail Export */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="normalMailLoadingExp"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Normal Mail:
                  </label>
                  <input
                    id="normalMailLoadingExp"
                    name="normalMailLoadingExp"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.normalMailLoadingExp}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Rapid Mail Export */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="rapidMailLoadingExp"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Rapid Mail:
                  </label>
                  <input
                    id="rapidMailLoadingExp"
                    name="rapidMailLoadingExp"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rapidMailLoadingExp}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Ambulance */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="ambulanceCarCount"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Ambulance:
                  </label>
                  <input
                    id="ambulanceCarCount"
                    name="ambulanceCarCount"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ambulanceCarCount}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Fire Fighting */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="fireFightingCarCount"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    Fire Fighting:
                  </label>
                  <input
                    id="fireFightingCarCount"
                    name="fireFightingCarCount"
                    type="number"
                    min="0"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fireFightingCarCount}
                    className="col-span-9 w-full px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* Push Back Checkbox */}
                <div className="grid grid-cols-12 items-center gap-2">
                  <label className="col-span-3 text-sm font-medium text-gray-700">
                    Ground Service:
                  </label>
                  <label className="col-span-9 flex items-center space-x-2 space-x-reverse cursor-pointer text-sm text-gray-700">
                    <input
                      type="checkbox"
                      name="hasPushPack"
                      checked={formik.values.hasPushPack}
                      onChange={formik.handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Push Back</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= Tab 4: Airline Agent Data ======================= */}
        {activeTab === 'agent' && (
          <div className="flex flex-col space-y-4 pb-20">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-semibold text-blue-700 mb-3 border-b pb-1.5">
                بيانات وكيل شركة الطيران (Airline Agent)
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="grid grid-cols-12 items-center gap-2">
                  <label
                    htmlFor="aireLineAgentId"
                    className="col-span-3 text-sm font-medium text-gray-700"
                  >
                    وكيل الطيران:
                  </label>
                  <div className="col-span-9 w-full">
                    {isLoadingAirlineAgents ? (
                      <div className="w-full h-[38px] bg-gray-200 animate-pulse rounded-md flex items-center px-3 text-xs text-gray-400">
                        جاري التحميل...
                      </div>
                    ) : (
                      <QuickSelect
                        options={airlineAgentsOptions}
                        name="aireLineAgentId"
                        value={formik.values.aireLineAgentId ?? ''}
                        onChange={(val) =>
                          formik.setFieldValue(
                            'aireLineAgentId',
                            val ? Number(val) : null,
                          )
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 space-x-reverse pt-4 border-t">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={updating}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {updating ? 'جارٍ التعديل...' : 'حفظ التعديلات'}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UseGetOfficerDataDetailById } from '../../Hooks/OfficerDataHook/UseGetOfficerDataDetailById';
interface Props {
  towerIdProp?: number | null;
}

const OfficerDataDetailsPage: React.FC<Props> = ({ towerIdProp }) => {
  const navigate = useNavigate();
  // يدعم جلب الـ ID من الرابط (مثلاً: /flight-details/14970) أو من الـ Props
  const { id } = useParams<{ id: string }>();
  const towerId = towerIdProp ?? (id ? Number(id) : null);

  // استدعاء الـ Hook وتسمية data بـ detailData مباشرة
  const {
    data: detailData,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = UseGetOfficerDataDetailById(towerId);

  // دالة مساعدة لعرض حالة الطلب كـ Badge ملون
  const renderStatusBadge = (status: number | null | undefined) => {
    switch (status) {
      case 1:
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
            قيد الانتظار (1)
          </span>
        );
      case 2:
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            تم القبول (2)
          </span>
        );
      case 3:
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
            تم التأكيد (3)
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 border border-gray-200">
            لا يوجد طلب
          </span>
        );
    }
  };

  // دالة مساعدة لتنسيق التاريخ والوقت
  const formatDateTime = (dateStr: string | null | undefined) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('ar-EG', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 1. التحقق من صحة رقم البرج
  if (!towerId || towerId <= 0) {
    return (
      <div dir="rtl" className="p-8 text-center text-gray-500">
        رقم سجل البرج غير صالح أو غير محدد.
      </div>
    );
  }

  // 2. حالة التحميل الأولي (Skeleton / Spinner)
  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="flex flex-col items-center justify-center min-h-[60vh] space-y-3"
      >
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 font-medium">
          جاري تحميل تفاصيل الرحلة والضابط...
        </p>
      </div>
    );
  }

  // 3. حالة حدوث خطأ في الجلب
  if (isError) {
    return (
      <div
        dir="rtl"
        className="max-w-2xl mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-xl text-center space-y-4"
      >
        <p className="text-red-700 font-bold text-lg">
          حدث خطأ أثناء جلب البيانات
        </p>
        <p className="text-red-600 text-sm">
          {(error as Error)?.message || 'تعذر الاتصال بالخادم'}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  // 4. في حال عدم وجود بيانات
  if (!detailData) {
    return (
      <div dir="rtl" className="p-8 text-center text-gray-500">
        لا توجد بيانات مسجلة لهذا الرقم (#{towerId}).
      </div>
    );
  }

  const { towerData } = detailData;

  return (
    <div
      dir="rtl"
      className="max-w-7xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen font-sans"
    >
      {/* شريط علوي للتحكم والرجوع */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition font-medium"
          >
            &rarr; رجوع
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              تفاصيل الرحلة:{' '}
              <span className="text-blue-600">
                {towerData?.flightNoName || '—'}
              </span>
            </h1>
            <p className="text-xs text-gray-500">
              رقم البرج: #{detailData.towerDataId} | رقم سجل الضابط: #
              {detailData.id || 'غير مسجل'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {renderStatusBadge(towerData?.requestStatus)}

          {towerData?.isAnyRequestNotAccepted && (
            <span className="px-3 py-1 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded-lg">
              يوجد طلبات غير مقبولة بعد
            </span>
          )}

          {towerData?.isAnyRequestNotConfirm && (
            <span className="px-3 py-1 text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200 rounded-lg">
              بانتظار تأكيد الوكيل
            </span>
          )}

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg transition flex items-center gap-2"
          >
            {isFetching ? 'جاري التحديث...' : 'تحديث الآن'}
          </button>
        </div>
      </div>

      {/* القسم الأول: بيانات البرج والرحلة (Tower Data) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-800 border-b pb-3 mb-4">
          بيانات البرج والرحلة الأساسية
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
          <InfoBox
            label="شركة الطيران"
            value={towerData?.airLineName}
            highlight
          />
          <InfoBox
            label="تسجيل الطائرة (Reg)"
            value={towerData?.aircraftRegName}
            highlight
          />
          <InfoBox label="من مطار" value={towerData?.airportIdFromName} />
          <InfoBox label="إلى مطار" value={towerData?.airportIdToName} />
          <InfoBox label="تاريخ الرحلة" value={towerData?.date} />
          <InfoBox
            label="وقت الوصول / الإقلاع (ATA / ATD)"
            value={`${towerData?.ata || '—'} / ${towerData?.atd || '—'}`}
          />
          <InfoBox
            label="تاريخ الهبوط الفعلي"
            value={formatDateTime(towerData?.landingDate)}
          />
          <InfoBox
            label="تاريخ الإقلاع الفعلي"
            value={formatDateTime(towerData?.takeOffDate)}
          />
          <InfoBox
            label="وكيل المناولة"
            value={detailData.handlingAgentName || 'غير محدد'}
          />
          <InfoBox
            label="شركة الوقود"
            value={detailData.fuelCompanyName || 'غير محدد'}
          />
          <InfoBox
            label="تأكيد الضابط"
            value={towerData?.isOfficerConfirmed ? 'مؤكد' : 'غير مؤكد'}
          />
          <InfoBox
            label="تاريخ الإنشاء"
            value={formatDateTime(detailData.creationDate)}
          />
        </div>
      </div>

      {/* القسم الثاني: بيانات الضابط والركاب والشحن (Officer Data) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-800 border-b pb-3 mb-4">
          إحصائيات الركاب والشحن والخدمات الأرضية
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
          <StatCard label="إجمالي الركاب (PAX)" value={detailData.pax ?? 0} />
          <StatCard
            label="ركاب دولي (Pax Inter)"
            value={detailData.paxInter ?? 0}
          />
          <StatCard
            label="مغادرون (بالغ / رضيع)"
            value={`${detailData.emb ?? 0} / ${detailData.embInft ?? 0}`}
          />
          <StatCard
            label="قادمون (بالغ / رضيع)"
            value={`${detailData.disemb ?? 0} / ${detailData.disEmbInft ?? 0}`}
          />
          <StatCard label="درجة أولى" value={detailData.firstClassCount ?? 0} />
          <StatCard
            label="الوقود (لتر)"
            value={detailData.fuelLiter ?? 0}
            isBlue
          />

          <StatCard
            label="إسعاف / إطفاء"
            value={`${detailData.ambulanceCarCount ?? 0} / ${detailData.fireFightingCarCount ?? 0}`}
          />
          <StatCard
            label="شحن (صادر / وارد)"
            value={`${detailData.freightLoadingExp ?? 0} / ${detailData.freightLoadingImp ?? 0}`}
          />
          <StatCard
            label="بريد عادي (صادر / وارد)"
            value={`${detailData.normalMailLoadingExp ?? 0} / ${detailData.normalMailLoadingImp ?? 0}`}
          />
          <StatCard
            label="بريد سريع (صادر / وارد)"
            value={`${detailData.rapidMailLoadingExp ?? 0} / ${detailData.rapidMailLoadingImp ?? 0}`}
          />
          <StatCard label="Trnycupps" value={detailData.trnycupps ?? 0} />
          <StatCard
            label="دفع خلفي (PushBack)"
            value={detailData.hasPushPack ? 'نعم' : 'لا'}
          />
          <StatCard
            label="عدم استخدام CUPPS"
            value={detailData.isNotUsedCupps ? 'نعم' : 'لا'}
          />
          <StatCard
            label="حساب جاري"
            value={detailData.isCurrentAccount ? 'نعم' : 'لا'}
          />
          <StatCard
            label="تم حساب المطالبة"
            value={detailData.isClaimCalculated ? 'نعم' : 'لا'}
          />
        </div>
      </div>

      {/* القسم الثالث: جدول تفاصيل طلبات الخدمة (Service Request Details) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h2 className="text-base font-bold text-gray-800">
            تفاصيل طلبات الخدمات (
            {towerData?.serviceRequestDetails?.length || 0})
          </h2>
        </div>

        {towerData?.serviceRequestDetails &&
        towerData.serviceRequestDetails.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700 border-b">
                  <th className="p-3">#</th>
                  <th className="p-3">نوع الخدمة</th>
                  <th className="p-3">العدد المطلوب</th>
                  <th className="p-3">تاريخ الطلب</th>
                  <th className="p-3">تاريخ القبول</th>
                  <th className="p-3">تاريخ تأكيد الوكيل</th>
                  <th className="p-3">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {towerData.serviceRequestDetails.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-3 font-medium text-gray-700">{item.id}</td>
                    <td className="p-3 font-bold text-blue-700">
                      {item.serviceTypeName || '—'}
                    </td>
                    <td className="p-3 font-semibold">
                      {item.countOfRequests ?? 0}
                    </td>
                    <td className="p-3 text-gray-600">
                      {formatDateTime(item.requestedAt)}
                    </td>
                    <td className="p-3 text-gray-600">
                      {formatDateTime(item.acceptedAt)}
                    </td>
                    <td className="p-3 text-gray-600">
                      {formatDateTime(item.confirmAgentAt)}
                    </td>
                    <td className="p-3">
                      {renderStatusBadge(item.requestStatus)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            لا توجد طلبات خدمة مسجلة لهذه الرحلة.
          </div>
        )}
      </div>
    </div>
  );
};

// مكونات فرعية صغيرة لتنظيم الكود ومنع التكرار
const InfoBox: React.FC<{
  label: string;
  value?: string | number | null;
  highlight?: boolean;
}> = ({ label, value, highlight }) => (
  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
    <span className="text-gray-500 block text-xs mb-1">{label}</span>
    <span
      className={`font-semibold ${highlight ? 'text-blue-700 text-base' : 'text-gray-900'}`}
    >
      {value || '—'}
    </span>
  </div>
);

const StatCard: React.FC<{
  label: string;
  value: string | number;
  isBlue?: boolean;
}> = ({ label, value, isBlue }) => (
  <div className="border border-gray-200 rounded-lg p-3 text-center bg-white">
    <span className="text-gray-500 block text-xs mb-1">{label}</span>
    <span
      className={`text-lg font-bold ${isBlue ? 'text-blue-600' : 'text-gray-800'}`}
    >
      {value}
    </span>
  </div>
);

export default OfficerDataDetailsPage;

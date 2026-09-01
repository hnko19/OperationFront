
import { useEffect, useState } from "react";
import type { IFlight } from "../../Interface/IFlight";
import { timeFormat } from "../../Helpers/timeFormat";
import { currentTime } from "../../Helpers/currentTime";
import TitleFlightTable from "../PageAbove/TitleFlightTable";

export default function FlightTable({flights , title , icon} : {flights : IFlight[] , title: string , icon: React.ReactNode}) {
const [now, setNow] = useState<string>("");

  useEffect(() => {
    // دالة تحدث الوقت كل ثانية
    const updateTime = () => {
      const current = currentTime();
      setNow(current);
    };

    updateTime(); // أول تشغيل
    const interval = setInterval(updateTime, 10000); // تحديث كل ثانية

    return () => clearInterval(interval); // تنظيف عند إغلاق الكمبوننت
  }, []);


  return (
    <>
     {/* Header */}
      <TitleFlightTable title={title} icon={icon} now={now} />

      {/* Table on large screens */}
      <table className="hidden md:table w-full text-center border-collapse divide-y divide-indigo-700">
        <thead>
          <tr className="text-xl font-bold bg-indigo-950 text-yellow-400">
            <th className="px-4 py-2 ">الزمن</th>
            <th className="px-4 py-2 ">خطوط الطيران</th>
            <th className="px-4 py-2 ">رقم الرحلة</th>
            <th className="px-4 py-2 ">الجهة</th>
            <th className="px-4 py-2 ">الحالة</th>
          </tr>
        </thead>
        <tbody className="text-white">
          {flights.map((flight, index) => (
            <tr
              key={index}
              className="border hover:bg-indigo-700 transition"
            >
              <td className="px-4 py-2">{timeFormat(flight.Time)}</td>
              <td className="px-4 py-2">{flight.AirlineNameAr}</td>
              <td className="px-4 py-2">{flight.FlightNo}</td>
              <td className="px-4 py-2">{flight.AirportFromNameAr}</td>
              <td
                className={`px-4 py-2 font-bold ${
                  flight.FlightStatusNameAr === "متأخرة" ? "text-red-400" : "text-green-400"
                }`}
              >
                {flight.FlightStatusNameAr}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cards on mobile */}
      <div className="md:hidden space-y-4 p-4">
        {flights.map((flight, index) => (
          <div
            key={index}
            className="bg-indigo-900 rounded-lg p-4 shadow-md border border-indigo-700"
          >
            <div className="flex justify-between">
              <span className="font-bold text-yellow-400">{flight.Time}</span>
              <span
                className={`font-bold ${
                  flight.FlightStatusNameAr === "ملغية" ? "text-red-400" : "text-green-400"
                }`}
              >
                {flight.FlightStatusNameAr}
              </span>
            </div>
            <div className="mt-2 text-white">
              <p>
                ✈️ <span className="font-bold">{flight.AirlineNameAr}</span>
              </p>
              <p>🔢 {flight.FlightNo}</p>
              <p>📍 {flight.AirportFromNameAr}</p>
            </div>
          </div>
        ))}
      </div>
    </>

  );
}

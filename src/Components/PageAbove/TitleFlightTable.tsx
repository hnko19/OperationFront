
export default function TitleFlightTable({title , icon , now} : {title: string , icon: React.ReactNode , now: string}) {
  return <>
  <div className="flex items-center justify-between p-6">
        <div className="flex items-center">
          {icon}
          <span className="ms-1.5 text-5xl font-bold"> {title} </span>
        </div>
        <span className="bg-yellow-500 text-indigo-900 px-4 py-2 rounded-full font-bold">
          {now}
        </span>
      </div>
  </>
}

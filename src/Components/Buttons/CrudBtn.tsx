
export default function CrudBtn({text , btnType , fun} : {text : string , btnType:string , fun: () => void; }) {

  let bgColor : string = "";
  let icon :   JSX.Element | null = null;
    if (btnType == "create") {
        bgColor = "bg-[#31213F]"
        icon = <i className="  fa-solid fa-plus"></i>;
    }else if(btnType == "cancel") {
        bgColor = "bg-orange-600"
        icon = <i className="  fa-solid fa-xmark"></i>;
    }else if(btnType == "delete") {
        bgColor = "bg-red-600"
        icon = <i className="  fa-solid fa-trash-can"></i>;
    }
    else if(btnType == "edit") {
        bgColor = "bg-green-600"
        icon = <i className="  fa-solid fa-pen-to-square"></i>;
    }
     else if(btnType == "view") {
        bgColor = "bg-indigo-500"
        icon =<i className="fa-regular fa-eye"></i>;
    }
    else if(btnType == "close") {
        bgColor = "bg-red-500"
        icon =<i className="fa-solid fa-lock"></i>;
    }
    else if(btnType == "open") {
        bgColor = "bg-green-500"
        icon =<i className="fa-solid fa-key"></i>;
    }
    else {
        bgColor = "bg-gray-600 "
    }
  return <>
    <button onClick={fun} className={`${bgColor} px-3 py-1  cursor-pointer  rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform  flex items-center`}>
        {icon} {text} 
    </button>
  </>

}

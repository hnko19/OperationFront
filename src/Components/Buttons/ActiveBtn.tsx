
export default function ActiveBtn({text , btnType,fun} : {text:string, btnType:boolean, fun: ()=> void}) {
    let btn;
    if(btnType){
        btn = <button className="px-2.5 py-1 rounded-sm bg-green-500 cursor-pointer text-white" onClick={fun}> 
                <i className="fa-solid fa-check-circle  me-1.5"></i>   {text}
            </button>
    }else {
        btn = <button className="px-2.5 py-1 rounded-sm bg-red-500 cursor-pointer text-white" onClick={fun}> 
                <i className="fa-solid fa-times-circle  me-1.5"></i>   {text}
            </button>
    }
  return <>
    {btn}
  </>
}

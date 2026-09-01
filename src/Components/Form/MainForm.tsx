
export default function MainForm({title , inputs} : {title:string , inputs: string[]} ) {
  return <>
  <div className="grid mx-auto bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
    <div className="flex justify-center py-4">
      <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
      </div>
    </div>

    <div className="flex justify-center">
      <div className="flex">
        <h1 className="text-gray-600 font-bold md:text-2xl text-xl"> {title} </h1>
      </div>
    </div>


    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">

      <div className="grid grid-cols-1">
        {
          inputs.map((_ , i: number)=> {
            return <div key= {i}>
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Input 2</label>
              <input className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="text" placeholder="Input 2" />
            </div>
          })
        }
      </div>
      
    </div>

    



    <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
      <button className='w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>Cancel</button>
      <button className='w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>Create</button>
    </div>

  </div>
  </>
}

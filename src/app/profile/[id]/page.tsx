export default function Userprofile({params}:any){
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>
        profile
      </h1>
      <hr />
      <p className="text-4xl"></p>
      <span className="p-2 rounded bg-orange-600">{params.id}</span>
    </div>
  )
}
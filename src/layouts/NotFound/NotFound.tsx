import StarLogo from '../../components/StarLogo/StarLogo';

const NotFound = () => {
  return (
    <div className="w-screen min-h-screen bg-black">
      <div className="w-fit min-h-screen flex flex-col justify-between mx-auto py-40">
        <div className="text-white text-center">
          <h1 className="font-black text-9xl leading-none">404</h1>
          <h2 className="uppercase font-bold text-xl">Page not found</h2>
        </div>
        <div><div className="mx-auto w-fit"><StarLogo /></div></div>
      </div>
    </div>
  )
}

export default NotFound;
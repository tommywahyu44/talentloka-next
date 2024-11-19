export default function EventCard({}) {
  return (
    <div className="mx-auto flex h-screen items-center justify-center bg-gray-700 px-8">
      <div className="flex w-full flex-col rounded bg-white shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5">
        <div
          className="h-64 w-full rounded-t bg-cover bg-top"
          style={{
            backgroundImage:
              "url('https://www.si.com/.image/t_share/MTY4MTkyMjczODM4OTc0ODQ5/cfp-trophy-deitschjpg.jpg)",
          }}></div>
        <div className="flex w-full flex-col md:flex-row">
          <div className="flex flex-row justify-around rounded bg-gray-400 p-4 font-bold uppercase leading-none text-gray-800 md:w-1/4 md:flex-col md:items-center md:justify-center">
            <div className="md:text-3xl">Jan</div>
            <div className="md:text-6xl">13</div>
            <div className="md:text-xl">7 pm</div>
          </div>
          <div className="p-4 font-normal text-gray-800 md:w-3/4">
            <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">
              2020 National Championship
            </h1>
            <p className="leading-normal">
              The College Football Playoff (CFP) determines the national champion of the top
              division of college football. The format fits within the academic calendar and
              preserves the sport’s unique and compelling regular season.
            </p>
            <div className="mt-4 flex flex-row items-center text-gray-700">
              <div className="w-1/2">Mercedes-Benz Superdome</div>
              <div className="flex w-1/2 justify-end">
                <img
                  src="https://collegefootballplayoff.com/images/section_logo.png"
                  alt=""
                  className="w-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

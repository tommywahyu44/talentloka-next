export default function AuthLayout({ url, children }) {
  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-2 xl:px-28">
          <div className="mx-auto w-full max-w-sm lg:w-96">{children}</div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src={url ?? '/images/background/bg-auth-client.avif'}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  )
}

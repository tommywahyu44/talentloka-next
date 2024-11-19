export default function EarlyOnboardingLayout({ url, children }) {
  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex w-2/5 flex-1 flex-col lg:flex-none">
          <div className="mx-auto w-full max-w-lg">{children}</div>
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

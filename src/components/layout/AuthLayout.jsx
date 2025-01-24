export default function AuthLayout({ url, children }) {
  const backgroundImageUrl = url ?? '/images/background/bg-auth-client.jpg'
  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center">
        <img
          src={backgroundImageUrl}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: 'blur(2px) grayscale(75%)',
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="m-3 w-full max-w-xl">
          <div className="relative rounded-xl bg-white px-4 py-6 shadow-2xl backdrop-blur-sm sm:p-10">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

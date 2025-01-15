export default function AuthLayout({ url, children }) {
  const backgroundImageUrl = url ?? '/images/background/bg-auth-client.jpg'
  return (
    <>
      <div
        className="relative flex min-h-screen items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="m-3 w-full max-w-xl rounded-2xl bg-white/70 p-3 sm:m-4 sm:p-4">
          <div className="relative rounded-xl bg-white px-4 py-6 shadow-2xl backdrop-blur-sm sm:p-10">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

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
        <div className="m-4 w-full max-w-xl rounded-2xl bg-white/70 p-4">
          <div className="relative rounded-xl bg-white p-10 shadow-2xl backdrop-blur-sm">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

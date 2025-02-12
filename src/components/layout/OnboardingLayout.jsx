import { Tooltip } from '@mui/material'

export default function OnboardingLayout({ email, signout, url, children }) {
  const backgroundImageUrl = url ?? '/images/team-spg-landing.jpg'
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
        <div className="m-3 w-full max-w-3xl">
          <div className="relative rounded-xl bg-white px-4 py-6 shadow-2xl backdrop-blur-sm sm:p-10">
            {children}
            <div className="px-3 text-center text-slate-500">
              <Tooltip
                title={email}
                arrow>
                <span className="text-sm">Change account? </span>
                <div
                  onClick={() => signout()}
                  className="inline cursor-pointer text-sm font-medium text-rose-600 hover:text-rose-700"
                  aria-hidden="true">
                  Signout
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

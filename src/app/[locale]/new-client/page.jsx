import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>SPG - Find the Best SPG for Your Event</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </Head>

      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <h1 className="flex items-center text-xl font-bold text-blue-700">
          <i className="fas fa-search mr-2"></i>SPG
        </h1>
        <div className="hidden space-x-6 md:flex">
          <a
            href="#"
            className="text-gray-700 hover:text-blue-500">
            Home
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-500">
            About
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-500">
            Services
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-500">
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-between bg-blue-700 p-10 text-white md:flex-row">
        <div className="md:w-1/2">
          <h1 className="mb-4 text-3xl font-bold">Find the Best SPG for Your Event</h1>
          <p className="mb-4 text-lg">
            Easily find and hire top Sales Promotion Girls for your events.
          </p>
          <div className="space-x-4">
            <button className="rounded-lg bg-white px-4 py-2 text-blue-700">Free Quote</button>
            <button className="rounded-lg border border-white px-4 py-2">Contact Us</button>
          </div>
        </div>
        <img
          src="/hero.png"
          alt="Hero Image"
          className="w-1/2"
        />
      </div>

      {/* About Section */}
      <div className="px-6 py-12 text-center">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">About Us</h2>
        <p className="mx-auto max-w-3xl text-gray-600">
          We specialize in connecting businesses with the best Sales Promotion Girls (SPGs) for
          events, brand activations, and marketing campaigns.
        </p>
      </div>

      {/* Services Section */}
      <div className="bg-gray-100 py-12 text-center">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Our SPG Services</h2>
        <div className="grid gap-6 px-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">Event Promotion</h3>
            <p className="mt-2 text-gray-600">
              Professional SPGs to boost engagement at your events.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">Product Launch</h3>
            <p className="mt-2 text-gray-600">
              Experienced SPGs to create excitement for new product releases.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold text-blue-700">Brand Awareness</h3>
            <p className="mt-2 text-gray-600">
              Boost your brand’s presence with skilled promotional staff.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="px-6 py-12 text-center">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">What Our Clients Say</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <p className="text-gray-600">
              "The SPGs provided were professional and engaging! Helped our brand a lot."
            </p>
            <h4 className="mt-4 font-semibold text-blue-700">- Jane Doe</h4>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <p className="text-gray-600">
              "Highly recommended! Our product launch was a great success thanks to SPG."
            </p>
            <h4 className="mt-4 font-semibold text-blue-700">- John Smith</h4>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 px-6 py-12 text-center">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Get In Touch</h2>
        <p className="mx-auto mb-6 max-w-2xl text-gray-600">
          Contact us today to find the best SPG for your upcoming event!
        </p>
        <button className="rounded-lg bg-blue-700 px-6 py-3 text-white">Contact Us</button>
      </div>
    </>
  )
}

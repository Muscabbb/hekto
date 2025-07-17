"use client";

const MainSection = () => {
  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* Animated Background SVG Items */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Jacket */}
        <div
          className="absolute top-20 left-10 animate-bounce"
          style={{ animationDuration: "3s", animationDelay: "0s" }}
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 100 100"
            className="text-pink-500"
          >
            <path
              d="M40 20 L60 20 L65 40 L65 80 L35 80 L35 40 Z"
              fill="currentColor"
              opacity="0.7"
            />
            <circle cx="45" cy="50" r="2" fill="white" />
            <circle cx="55" cy="50" r="2" fill="white" />
          </svg>
        </div>

        {/* Floating Handbag */}
        <div
          className="absolute top-32 right-16 animate-pulse"
          style={{ animationDuration: "2s" }}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 100 100"
            className="text-pink-400"
          >
            <ellipse
              cx="50"
              cy="50"
              rx="35"
              ry="25"
              fill="currentColor"
              opacity="0.6"
            />
            <path
              d="M20 35 Q50 20 80 35"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Floating Sunglasses */}
        <div
          className="absolute top-64 left-20 animate-spin"
          style={{ animationDuration: "8s" }}
        >
          <svg
            width="45"
            height="45"
            viewBox="0 0 100 100"
            className="text-gray-700"
          >
            <circle cx="25" cy="50" r="15" fill="currentColor" opacity="0.8" />
            <circle cx="75" cy="50" r="15" fill="currentColor" opacity="0.8" />
            <path d="M40 50 L60 50" stroke="currentColor" strokeWidth="3" />
          </svg>
        </div>

        {/* Floating Shoe */}
        <div
          className="absolute bottom-32 right-20 animate-bounce"
          style={{ animationDuration: "2.5s", animationDelay: "1s" }}
        >
          <svg
            width="55"
            height="55"
            viewBox="0 0 100 100"
            className="text-pink-500"
          >
            <ellipse
              cx="50"
              cy="40"
              rx="35"
              ry="15"
              fill="currentColor"
              opacity="0.7"
            />
            <path
              d="M20 40 L20 55 L80 55 L80 40"
              fill="currentColor"
              opacity="0.5"
            />
            <path d="M80 55 L85 70" stroke="currentColor" strokeWidth="4" />
          </svg>
        </div>

        {/* Floating Dress */}
        <div
          className="absolute bottom-20 left-32 animate-pulse"
          style={{ animationDuration: "3.5s" }}
        >
          <svg
            width="40"
            height="60"
            viewBox="0 0 100 120"
            className="text-pink-400"
          >
            <rect
              x="35"
              y="20"
              width="30"
              height="15"
              fill="currentColor"
              opacity="0.8"
            />
            <path
              d="M30 35 L70 35 L75 100 L25 100 Z"
              fill="currentColor"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Floating Watch */}
        <div
          className="absolute top-40 right-32 animate-spin"
          style={{ animationDuration: "6s" }}
        >
          <svg
            width="35"
            height="35"
            viewBox="0 0 100 100"
            className="text-gray-600"
          >
            <rect
              x="30"
              y="25"
              width="40"
              height="50"
              rx="5"
              fill="currentColor"
              opacity="0.7"
            />
            <circle cx="50" cy="50" r="15" fill="white" opacity="0.9" />
          </svg>
        </div>

        {/* Floating Hat */}
        <div
          className="absolute top-16 right-40 animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "2s" }}
        >
          <svg
            width="50"
            height="50"
            viewBox="0 0 100 100"
            className="text-pink-500"
          >
            <ellipse
              cx="50"
              cy="40"
              rx="35"
              ry="20"
              fill="currentColor"
              opacity="0.6"
            />
            <ellipse
              cx="50"
              cy="55"
              rx="45"
              ry="8"
              fill="currentColor"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Small decorative dots */}
        <div
          className="absolute top-1/4 left-1/4 animate-ping"
          style={{ animationDuration: "2s" }}
        >
          <div className="w-3 h-3 bg-pink-400 rounded-full opacity-60"></div>
        </div>
        <div
          className="absolute bottom-1/3 right-1/3 animate-ping"
          style={{ animationDuration: "3s", animationDelay: "1s" }}
        >
          <div className="w-2 h-2 bg-pink-500 rounded-full opacity-50"></div>
        </div>
        <div
          className="absolute top-1/2 left-1/6 animate-ping"
          style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
        >
          <div className="w-4 h-4 bg-pink-300 rounded-full opacity-40"></div>
        </div>
      </div>

      {/* Main Content - Centered */}
      <section className="relative z-10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Pink subtitle */}
            <p className="text-pink-500 font-medium text-lg mb-4">
              Best Fashion For Your Style...
            </p>

            {/* Main heading */}
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              New Fashion Collection
              <br />
              <span className="text-gray-800">Trends in 2025</span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Find your next favorite outfit with styles made for real life.
              Whether {`you're`} dressing up or keeping it casual, our
              collection of clothing and accessories makes it easy to look and
              feel good. Explore fresh arrivals, seasonal picks, and everyday
              pieces that fit your vibe.
            </p>
          </div>
        </div>
      </section>

      {/* Large Product Image */}
      <div className="absolute right-8 lg:right-16 top-1/2 transform -translate-y-1/2 z-0 opacity-20 lg:opacity-30">
        <div className="w-64 lg:w-96 h-64 lg:h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="text-white"
          >
            {/* Stylized jacket/clothing item */}
            <path
              d="M60 40 L140 40 L150 80 L150 160 L50 160 L50 80 Z"
              fill="currentColor"
              opacity="0.8"
            />
            <path
              d="M50 80 L30 90 L30 150 L50 140 Z"
              fill="currentColor"
              opacity="0.6"
            />
            <path
              d="M150 80 L170 90 L170 150 L150 140 Z"
              fill="currentColor"
              opacity="0.6"
            />
            <circle cx="80" cy="100" r="4" fill="white" />
            <circle cx="80" cy="120" r="4" fill="white" />
            <circle cx="80" cy="140" r="4" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MainSection;

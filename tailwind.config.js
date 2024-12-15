import plugin from "tailwindcss/plugin";
import formsPlugin from "@tailwindcss/forms";
import aspectRatioPlugin from "@tailwindcss/aspect-ratio";

const action = "#FC8B40";

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
  	extend: {
  		colors: {
  			bgPrimary: '#fff',
  			bgSecondary: '#FAFAFA',
  			bgPrimaryDarkTheme: '#191B1F',
  			bgSecondaryDarkTheme: '#20232B',
  			textPrimary: '#22283C',
  			textSecondary: '#9DA1B4',
  			textDarkTheme: '#fff',
  			grey: '#D4D4D4',
				action,
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		spacing: {
  			'0.5': '0.12rem',
  			layout: '2.75rem'
  		},
  		fontSize: {
  			'2lg': '1.38rem'
  		},
  		borderRadius: {
  			image: '0.5rem',
  			layout: '0.8rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		transitionTimingFunction: {
  			DEFAULT: 'ease-in-out'
  		},
  		transitionDuration: {
  			DEFAULT: '200ms'
  		},
  		zIndex: {
  			'1': '1',
  			'2': '2',
  			'3': '3'
  		},
  		keyframes: {
  			fade: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.9)'
  				},
  				'50%': {
  					opacity: '0.3'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			slideup: {
  				from: {
  					opacity: '0',
  					transform: 'translateY(25%)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'none'
  				}
  			},
  			slidedown: {
  				from: {
  					opacity: '0',
  					transform: 'translateY(-25%)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'none'
  				}
  			},
  			slideleft: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(-20px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			slideright: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(20px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			}
  		},
  		animation: {
  			fade: 'fade .5s ease-in-out',
  			scaleIn: 'scaleIn .35s ease-in-out',
  			slideup: 'slideup 1s ease-in-out',
  			slidedown: 'slidedown 1s ease-in-out',
  			slideleft: 'slideleft 1s ease-in-out',
  			slideright: 'slideright 1s ease-in-out'
  		}
  	}
  },
  plugins: [
    formsPlugin,
    aspectRatioPlugin,
    plugin(({ addComponents, theme, addUtilities }) => {
      addComponents({
        ".btn-primary": {
          backgroundColor: action,
          color: "#fff",
          borderRadius: "0.65rem",
          transition: "background-color .3s ease-in-out",
          "&:hover": {
            backgroundColor: "#E06B40",
          },
        },
        ".text-link": {
          color: "rgba(255, 255, 255, .9)",
          transition: "text-decoration-color .3s ease-in-out",
          textDecorationLine: "underline",
          textDecorationColor: "rgba(255,255,255, 0.2)",
          "&:hover": {
            textDecorationColor: "rgba(255, 255, 255, .9)",
          },
        },
        ".air-block": {
          borderRadius: theme("borderRadius.layout"),
          backgroundColor: theme("colors.gray.950"),
          color: theme("colors.white"),
          boxShadow: theme("boxShadow.lg"),
        },
      });
      addUtilities({
        ".text-shadow": {
          textShadow: "1px 1px rgba(0, 0, 0, 0.4)",
        },
        ".outline-border-none": {
          outline: "none",
          border: "none",
        },
        ".flex-center-between": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        ".image-like-bg": {
          objectPosition: "center",
          objectFit: "cover",
          pointerEvents: "none",
        },
      });
    }),
      require("tailwindcss-animate")
],
};

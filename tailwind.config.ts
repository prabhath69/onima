import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			transitionDuration: {
				'50': '50ms'  // Add the custom duration
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Onima custom colors
				onima: {
					'dark': '#0A0A0A',
					'blue': '#0062FF',
					'neon': '#00F0FF',
					'grey': '#232323',
					'light': '#F8F8F8',
					'space-blue': '#0F2027',
					'rich-violet': '#2C5364',
					'electric-blue': '#00c6ff',
					'neon-purple': '#0072ff',
					'lime-green': '#00f260',
					'ocean-blue': '#0575e6',
					'vivid-purple': '#7F00FF',
					'magenta': '#E100FF',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.6' },
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'pulse-gradient': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
				},
				'floating-orb': {
					'0%': { transform: 'translate(0, 0)', opacity: '0.5' },
					'33%': { transform: 'translate(5px, -5px)', opacity: '0.75' },
					'66%': { transform: 'translate(-5px, 5px)', opacity: '0.6' },
					'100%': { transform: 'translate(0, 0)', opacity: '0.5' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 3s ease-in-out infinite',
				'spin-slow': 'spin-slow 20s linear infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
				'pulse-gradient': 'pulse-gradient 8s ease infinite',
				'floating-orb': 'floating-orb 10s ease-in-out infinite',
			},
			backgroundImage: {
				'hero-gradient': 'linear-gradient(to bottom, #0A0A0A, #0F2027, #2C5364)',
				'button-gradient': 'linear-gradient(to right, #00c6ff, #0072ff)',
				'accent-gradient': 'linear-gradient(to right, #00f260, #0575e6)',
				'purple-gradient': 'linear-gradient(to right, #7F00FF, #E100FF)',
				'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #00c6ff, #0072ff, #7F00FF, #E100FF, #00c6ff)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

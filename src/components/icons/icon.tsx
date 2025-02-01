import * as React from "react"

export function BrillianceIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={32}
			height={32}
			fill="currentColor"
			className="bi bi-brilliance"
			viewBox="0 0 16 16"
			{...props}
		>
			<path d="M8 16A8 8 0 118 0a8 8 0 010 16M1 8a7 7 0 007 7 3.5 3.5 0 100-7 3.5 3.5 0 110-7 7 7 0 00-7 7" />
		</svg>
	)
}

export function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="white"
			className="bi bi-discord"
			viewBox="0 0 16 16"
			{...props}
		>
			<path d="M13.545 2.907a13.2 13.2 0 00-3.257-1.011.05.05 0 00-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 00-3.658 0 8 8 0 00-.412-.833.05.05 0 00-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 00-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 003.995 2.02.05.05 0 00.056-.019q.463-.63.818-1.329a.05.05 0 00-.01-.059l-.018-.011a9 9 0 01-1.248-.595.05.05 0 01-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 01.051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 01.053.007q.121.1.248.195a.05.05 0 01-.004.085 8 8 0 01-1.249.594.05.05 0 00-.03.03.05.05 0 00.003.041c.24.465.515.909.817 1.329a.05.05 0 00.056.019 13.2 13.2 0 004.001-2.02.05.05 0 00.021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 00-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
		</svg>
	)
}

export function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="white"
			className="bi bi-github"
			viewBox="0 0 16 16"
			{...props}
		>
			<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8" />
		</svg>
	)
}

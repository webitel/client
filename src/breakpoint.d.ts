// Augments Vue's component instance with the reactive viewport helper installed
// globally by BreakpointPlugin (@webitel/ui-sdk/src/plugins/breakpoint).
// ui-sdk types the plugin's install() as `(app: any)`, so `$breakpoint` is
// otherwise untyped on `this` / template refs.
// TODO(types): drop once ui-sdk ships a typed breakpoint plugin.
import 'vue';

interface WtBreakpoint {
	xs: boolean;
	sm: boolean;
	md: boolean;
	lg: boolean;
	xl: boolean;
	xsOnly: boolean;
	smOnly: boolean;
	smAndDown: boolean;
	smAndUp: boolean;
	mdOnly: boolean;
	mdAndDown: boolean;
	mdAndUp: boolean;
	lgOnly: boolean;
	lgAndDown: boolean;
	lgAndUp: boolean;
	xlOnly: boolean;
	mobile: boolean;
	name: string;
	height: number;
	width: number;
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$breakpoint: WtBreakpoint;
	}
}

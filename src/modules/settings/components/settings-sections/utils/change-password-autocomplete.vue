<!-- 
	@author @rzaritskyi

	[WTEL-5775](https://webitel.atlassian.net/browse/WTEL-5775)

	The browser aggressively  tries to detect username/password fields 
	based on any hints(name, id, label, etc), so autocomplete="off", or
	"new-password" often does not work.
	The workaround is to "trick" the browser by adding fake inputs.
-->
<template>
  <input
  	type="text"
    name="autocomplete_username"
    autocomplete="username"
    style="display: none;"
  >
  <input
    type="password"
    name="autocomplete_password"
    autocomplete="current-password"
    style="display: none;"
  >
</template>
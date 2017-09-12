module.exports = {
	globals: {
		server: true,
	},
	"root": true,
	"parserOptions": {
		"ecmaVersion": 2017,
		"sourceType": "module"
	},
	"extends": [
		"eslint:recommended",
		"plugin:ember-suave/recommended"
	],
	"env": {
		"browser": true
	},
	"rules": {
		"no-console": "off",
		"no-extra-parens": "error",
		"no-template-curly-in-string": "error",
		"indent": ["error", "tab"],
		"max-len": ["error", 140 ],
		"comma-dangle": ["error", "never"],
		"no-cond-assign": ["error", "always"],
		"object-curly-spacing": ["error", "always"],
		"max-statements-per-line": ["error", { "max": 2 }],
		"no-constant-condition": ["error", { "checkLoops": false }],
		"brace-style": ["error", "stroustrup", { "allowSingleLine": true }]
	}
}

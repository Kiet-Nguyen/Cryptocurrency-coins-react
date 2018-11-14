module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "jsx-a11y/label-has-for": [1, {
            "required": {
                "some": ["nesting", "id"]
            },
            "allowChildren": true,
        }]
    },
    "env": {
        "browser": true,
        "node": true,
    },
};
module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "jsx-a11y/label-has-for": {
            "required": {
                "some": ["nesting", "id"]
            },
            "allowChildren": false,
        }
    },
    "env": {
        "browser": true,
        "node": true,
    },
};
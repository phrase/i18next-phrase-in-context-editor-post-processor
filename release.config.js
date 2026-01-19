module.exports = {
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        ["@semantic-release/exec", {
            prepareCmd: "npm version ${nextRelease.version} --no-git-tag-version",
            publishCmd: "npm publish --provenance"
        }],
        "@semantic-release/git"
    ],
    "preset": "angular"
};

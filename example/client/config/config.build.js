
module.exports = {
  cdn: '',
  alias: {},
  plugins: [],
  babel: {
    plugins: [
      ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }]
    ]
  },
  theme: {
    "@primary-color": "#19A973"
  }
}

module.exports = function startDialog({ question, options }) {
  console.log(` ${question}`)
  if (options) options.forEach((option, index) => console.log(`  ${index}: ${option}`))
  process.stdout.write(`   > `)
}

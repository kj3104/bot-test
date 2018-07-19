/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('issue_comment.created', async context => {
    var executeTest = true
    const labels = context.payload.issue.labels
    const issues = context.github.issues
    for (var index in labels) {
      if (labels[index].name == 'テストしない') {
        executeTest = false
        break
      }
    }
    const commentBody = context.payload.comment.body
    if (commentBody == "test start") {
      if (executeTest == true){
        const prComment = context.issue({ body: 'ここでTest開始するよ' })
        return issues.createComment(prComment)
      } else {
        const prComment = context.issue({ body: '今はTest開始できないよ' })
        return issues.createComment(prComment)
      }
    }
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}

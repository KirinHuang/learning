const cliExsits = require('command-exists')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const commitId = process.argv[2]
const cwd = process.cwd()

cliExsits('git', function (err, commandExists) {
  if (commandExists) {
    // 同步git的commit
    startSync(commitId)
  } else {
    console.log('没有安装git')
  }
})

/**
 * 同步commit
 * @param {sha hash} commitId 
 */
async function startSync (commitId) {
  if (!checkCommit(commitId)) return false

  // get all branches
  let { stdout } = await exec('git branch -a', {cwd: cwd})
  let branches = getRemoteBranches(parseStdout(stdout))

  branches.forEach(async function (branch) {
    // git checkout ${branch}
    const checkoutMsg = await exec(`git checkout ${branch}`, { cwd: cwd })
    if (checkCommit.stderr === '' && !checkCommitExists(commitId)) {
      mergeCommit(commitId).then(() => {
        push2Remote(branch)
      })
    }
  })
}

async function push2Remote (branch) {
  // git push -u ${branch} ${branch}
  return new Promise(async (resolve, reject) => {
    const { stdout, stderr } = await exec(`git push -u ${branch} ${branch}`, { cwd: cwd })
    if (stderr !== '') {
      resolve(true)
    }

    reject(false)
  })
}

async function mergeCommit (commitId) {
  // git cherry-pick ${commitId}
  return new Promise(async (resolve, reject) => {
    const { stdout, stderr } = await exec(`git cherry-pick ${commitId}`, { cwd: cwd })
    if (stderr === '') {
      return true
    }
    reject(false)
  })
}

/**
 * 判断commit是否存在
 * @param {*} commitId 
 */
async function checkCommitExists (commitId) {
  const commitMsg = await exec('git cat-file -t ' + commitId, { cwd: cwd })

  if (commitMsg.stdout.indexOf('commit') === -1) {
    return true
  } else {
    console.log(`already merged commit ${commitId}`)
  }
}

/**
 * 校验commit
 * @param {sha hash} commitId 
 */
function checkCommit (commitId) {
  if ( commitId.length != 7 
    && commitId.length != 40) {
      console.log(`invalide commit id ${commitId.length}`)
      return false
  }

  return true
}

/**
 * 转成行
 * @param {String} stdout 
 */
function parseStdout (stdout) {
  const lines = stdout.split('\n')
  return lines
}

/**
 * 获取远程分支
 * @param {Array} branches 
 */
function getRemoteBranches (branches) {
  const ret = []
  branches.forEach(function (item) {
    let index = item.indexOf('remotes/origin/')
    if (index !== -1 && item.indexOf('remotes/origin/HEAD') === -1) {
      ret.push(item.substr(index + 15))
    }
  })

  return ret
}
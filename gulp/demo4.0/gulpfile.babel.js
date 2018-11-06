import {task, src, dest, series} from 'gulp'

const clean = () => {
  console.log('hello, babel')
}

task('build', function () {
  console.log('build -------')
})

// export default clean
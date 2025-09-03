const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    core.notice('Hello from my custom Javascription Action!');

    // 1) Get the input values
    const bucket = core.getInput('bucket-name', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });

    // 2) Upload files
    // Github VM (ubuntu) already comes with AWS CLI Installed 
    // so we are using that runner to run AWS command
    const s3Uri = `s3://${bucket}`
    //exec.exec('aws s3 sync <local-folder> <s3-bucket>')
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`)

    const websiteURL = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`
    core.setOutput('website-url', websiteURL); // equivalent to ::set-output in echo command
}

run();
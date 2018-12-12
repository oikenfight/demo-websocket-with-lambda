# Demo App for Websocket with AWS Lambda

This is a sample application for serverless application with AWS Lambda and S3 static web.

# Getting Started

- Installation & Setup
- Development
- Deploy

## Installation & Setup

### Local Environment Requirements

Requirements

- [NodeJS 8.10+ installed](https://nodejs.org/en/download/)
- [Docker installed](https://www.docker.com/community-edition)
- pip

You need to set up your aws configure before.
- https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/installing.html
- https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-chap-getting-started.html

Next, please install awscli and aws-sam-cli.

```$xslt
$ pip install awscli aws-sam-cli
```

Confirm the installation is completed like this commands.

```$xslt
$ aws --version
aws-cli/1.16.67 Python/3.6.1 Darwin/18.2.0 botocore/1.12.57

$ sam --version
SAM CLI, version 0.8.0
```

In addition, you need to create account of [Fanout](https://fanout.io/).  
And set the `GRIP_URL` into `lambda_app/.env`.
```
GRIP_URL ="https://api.fanout.io/realm/{realm-id}?iss={realm-id}&key=base64:{realm-key}"
```

### Installing project to your local


### Install dependencies

Please install node packages for lambda_app and s3_app.
```$xslt
$ cd ./lambda_app
$ npm install
```

```$xslt
$ cd ./s3_app
$ npm install
```

## Development your Local lambda_app

### Local Test your Lambda Function
If you set up Output API in your template.yaml, you can test your lambda function in your local environment.  
First, you start the api server.
```$xslt
$ sam local start-api
```
And test you function with this command.
```$xslt
$ curl http://127.0.0.1:3000/[some_route]
```

### Create Lambda Event
Lambda function can be executed without starting your local api server.  
First, generate a pseudo event that should be sent to Lambda in your local environment.  
```$xslt
$ sam local generate-event apigateway aws-proxy > event_file.json
```
And invoke the pseudo event with this command.
```$xslt
$ sam local invoke [Some]Function --event event_file.json
```
You can receive results of this lambda function.


## Deploy lambda_app

### Create S3 Bucket
If you do not create a s3 bucket to store your lambda function code, you need to create it first.
```$xslt
$ aws s3 mb s3://<some bucket name>
```

### Packaging
Package the lambda function code to your s3 bucket like this.
```$xslt
$ sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket <some bucket name>
```

### Deploy
Deploy the package to AWS Lambda.
```$xslt
$ sam deploy --template-file packaged.yaml --stack-name <some app name> --capabilities CAPABILITY_IAM
```

### Get Endpoints
You can get endpoint to access your lambda function. 
```$xslt
$ aws cloudformation describe-stacks --stack-name <some app name> --query 'Stacks[].Outputs'
``` 

Confirm your lambda function. For example like this.
```$xslt
$ curl https://<api> 
```

## Deploy s3_app

### Create S3 Bucket
If you do not create a s3 bucket to store your lambda function code, you need to create it first.
```$xslt
$ aws s3 mb s3://<some bucket name>
```

### Set up S3 Properties
1. open the s3 bucket
2. open static website hosting in Properties tab
3. input `index.html` into index document form
4. click the save button

### Set up S3 permissions
1. open the s3 bucket
2. open Bucket Pollcy in Permissions tab
3. input this
    ```$xslt
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "AddPerm",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::[your bucket name]/*"
            }
        ]
    }
    ```
4. click the save button

### Upload
Upload public resources to your s3 bucket.

```$xslt
$ aws s3 sync public/ s3://[your bucket name]/ --include "*" --acl public-read --cache-control "max-age=360" --profile=[your profile name]
```

### Access
Access to your s3 bucket endpoint.

# A simple Blog Application with multiple Microservice

## Commands

### Building Images and Updating Deployments

```
cd posts
docker build -t nabeeldanishcowlar/posts .
docker push nabeeldanishcowlar/posts
kubectl rollout restart deployment posts-depl
```

# Deploying to a Kubernetes Cluster

The Helm files provided consist, as any Helm repository, of two types of files:

- The templates: the files that describe the Kubernetes resources that have to be started
- The chart an values files: the files that define the values used by the templates

The templates were scripted to the definition of the Docker container known at the time the templates were written, and will only have to be changed when the container definition changes (debugging the containers aside).

The chart file also is defined as is for the moment, and should not need to be changed unless major definitions or dependencies are introduced.

The values file however ([values.yaml](values.yaml)) will most definitely have to be edited with default values. As said before, the values file defines the values for a number of variables used throughout the Helm templates.
When looking at this file, we should see a clear mapping of most values to environment variables in the docker-compose.yaml.

There are some values that are not mapped to the environment files in the docker-compose file. These values are used to define some Kubernetes specific settings. Most notable of these values are the number of pods that have to be started (replicaCount), when the cluster should pull new images (image.pullPolicy).
Other values in this part are less relevant at this point.

There are two ways to set values: to write them in the values file, which we recommend for values that do not have to be changed per cluster, and do not affect the security of the container. The other way is to set them using the ```--set``` option of ```helm install``` or ```helm upgrade```. This way of setting values is not stored in the values.yaml file, and therefore ensures that secret values are not stored in the values.yaml file.
To use the ```--set``` option in your deployment, please note that the setting you want to override has to be defined (but does not have to contain values) in the values.yaml file, and that you override them by writing down the yaml path of the setting, and divide the settings with a comma. For example, to set the api key and the pepper you write:
```CLI
helm install bisc-taalhuizen ./helm --namespace prod --set security.apiKey=your-api-key-here,security.pepper=1234567890ABCDEFFEDCBA0987654321 --kubeconfig kubeconfig.yaml
```

# Read more
This readme only provides a very brief introduction to the helm files in this repository, if you want to know more about deploying with helm we kindly refer you to:

- [The helm website](https://helm.sh)
- [The installation manual of the conduction commonground example component](https://github.com/ConductionNL/commonground-example/blob/master/INSTALLATION.md)
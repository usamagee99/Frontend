## utnt-nuxt-webapp
Web application frontend for utnt IOT device monitoring system.

## Deployment

1. Clone the repository into the target system;
2. Run `docker build -t utnt_devices_webapp /path/to/your/nuxt/projectroot`;
3. Run the comtainer with `docker compose up` or `docker compose up -d` using the compose file located in `/home/utntexecutor/UTNT/utnt_devices_webapp`.
4. Modify nuxt.config to ts and make sure it includes: 
```
app: {
  baseURL: '/portal/'
}
```
5. If you cant find the compose file you can use: 
```
docker run --net utnt_appnet -u 1005:1005 
--name utnt_devices_webapp 
--network=utnt_appnet
--log-driver json-file 
--log-opt max-size=100k,max-file=10 
--restart unless-stopped 
utnt_devices_webapp```

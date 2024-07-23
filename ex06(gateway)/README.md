Инструкция:

1. `minikube start --driver=hyperkit`
2. прокидываем ip `minikube ip` добавляем в `/etc/hosts`
3. `helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx`
4. `helm repo update`

5. Nginx -
```bash
helm install hello-ingress-nginx ingress-nginx/ingress-nginx --namespace hello-ingress --create-namespace --atomic -f ./nginx-ingress.yaml
```

6. Prometheus
```bash
helm  install hello-prometheus prometheus-community/kube-prometheus-stack --namespace hello-monitoring --create-namespace --atomic -f ./kube-prometheus-stack.yaml
```

7. Запуск постгри и ноду приложений
```bash
cd ./deployments/users-chart  && helm install app . --namespace app --create-namespace
```

8. Запуск постгри и нод приложений
```bash
cd ../auth-chart  && helm install auth . --namespace auth --create-namespace
```

9. Прокидываем порты для графаны и прометея
```bash
kubectl port-forward service/hello-prometheus-grafana -n hello-monitoring 9000:80
```

```bash
kubectl port-forward service/hello-prometheus-kube-prom-prometheus  -n hello-monitoring 9090
```

9. Заходим в графану на localhost:9000 логин/пароль - admin/prom-operator

10. Импортируем дашик
Основной Dashboard - `grafana/dashboard.json`
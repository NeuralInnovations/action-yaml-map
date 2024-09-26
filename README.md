# action-yaml-map
Parsing input data in yaml format as a key-value dictionary and getting the value by key

```yaml
- name: map
    uses: NeuralInnovations/action-yaml-map@v1
    id: map1
    key: dev1
    with:
      map: |
        dev1: dev1.host.com
        dev2: 
          domain: dev2.host.com
          port: 8080
  - name: test
    run: |
      echo "${{ steps.map1.outputs.value }}"
      echo "${{ steps.map1.outputs.status }}" # ok|fail
  #---------------------------------------------------
  - name: map
    uses: NeuralInnovations/action-yaml-map@v1
    id: map2
    key: dev2
    with:
      map: |
        dev1: dev1.host.com
        dev2: 
          domain: dev2.host.com
          port: 8080
  - name: test
    run: |
      echo "${{ steps.map2.outputs.domain }}"
      echo "${{ steps.map2.outputs.port }}"
      echo "${{ steps.map2.outputs.status }}" # ok|fail
```
#  GitHub으로 Vue 페이지 배포하기

FHTH 프론트 페이지를 호스팅할 서버를 찾다가 GitHub에서 제공하는 서비스를 이용해보았습니다.



## NPM 의존성 추가

```bash
npm i gh-pages
# https://www.npmjs.com/package/gh-pages
npm i @vue/cli-service
# https://www.npmjs.com/package/@vue/cli-service
```

gh-pages

> vue-client-service

위 두 모듈을 설치합니다.

vue 프로젝트에서 vue-client-service를 이용해 build 해야함.

## npm의 package.json에 script 추가

1. "predeploy" : "vue-cli-service build",
2. "deploy": "gh-pages -d dist",
3. "clean":"gh-paages-clean",


## package.json에 hompage 추가

1. http://[organization].github.io/[project]
2. 첫번째 계층에 추가


1. npm i gh-pages -D
   1. github에서 배포용 브런치를 자동으로 생성해줌
2. vue.json.config에 내용추가
   1. publicPath: "/FHTH_free/",
       1. 하위도메인
   2. outputDir: "dist"
3. 참고자료
   1. react로 github 올리기





# 참고자료

| 링크                                       | 내용               |
| ---------------------------------------- | ---------------- |
| [GitHub/Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) | 관련 공식문서          |
| [github-actions를 이용하여 gh-pages 자동배포하기](https://davidyang2149.dev/front-end/github-actions%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-gh-pages-%EC%9E%90%EB%8F%99-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0/) | 실제 사용 과정 확인      |
| [https://jekyllrb.com/docs/](https://jekyllrb.com/docs/) | jekyll documents |
| [Jekyll와 Github Pages를 이용한 Static Website 구축](https://poiemaweb.com/jekyll-basics) | Ruby 실제 사용과정 확인  |


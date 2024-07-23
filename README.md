# CallMeRainyDay

CallMeRainyDay는 사용자가 특정 이메일 주소를 구독하면 매일 아침 8시에 비가 올 경우 이메일로 알림을 보내주는 프로젝트입니다.

## 기능

- 사용자가 이메일 주소를 구독할 수 있는 웹 페이지 제공
- 매일 아침 8시에 날씨를 확인하고 비가 오는 경우 이메일 알림 발송
- 구독자 정보를 파일에 저장 및 관리

## 기술 스택

- **프론트엔드**: React (Next.js)
- **백엔드**: Node.js, Express
- **데이터 저장소**: JSON 파일
- **이메일 전송**: Nodemailer
- **스케줄링**: node-cron
- **날씨 API**: OpenWeather API

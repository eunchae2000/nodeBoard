var express = require('express');
var router = express.Router();
var BoardController = require('../controller/boardController');


// get = 조회
// post = 생성
// put = 전체 수정
// patch = 단일 수정
// delete = 삭제

/* TODO: 게시글 목록 표시
1. DB에서 데이터를 가져와야함
2. 글번호, 제목, 글작성자를 표시해줘야됨*/

/* 게시글 메인 화면 */

/* 게시글 목록 표시 */
router.get('/board/list', BoardController.BoardList)
/* 게시글 상세 보기 */
router.get("/board/read/:board_uid", BoardController.showBoard)
/* 게시글 작성 */
router.post('/board/write', BoardController.insertBoard)
/* 게시글 작성 페이지 */
router.get('/board/write', BoardController.createBoard)
/* 게시글 수정 */
router.patch('/board/update/:board_uid', BoardController.updateBoard)
/* 게시글 수정 페이지 */
router.get('/board/update/:board_uid', BoardController.patchBoard)
/* 게시글 삭제 */
router.delete('/board/delete/:board_uid', BoardController.deleteBoard)

module.exports = router;
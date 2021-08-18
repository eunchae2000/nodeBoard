var express = require('express');
var router = express.Router();
var BoardController = require('../controller/boardController');
const pool = require('../middleware/pool');
const conn = pool.init();

// get = 조회
// post = 생성
// put = 전체 수정
// patch = 단일 수정
// delete = 삭제

/* TODO: 게시글 목록 표시
1. DB에서 데이터를 가져와야함
2. 글번호, 제목, 글작성자를 표시해줘야됨*/

/* 게시글 목록 표시 */
router.get('/list', BoardController.getBoard)
/* 게시글 상세 보기 */
router.get("/:boardId", BoardController.showBoard)
/* 게시글 작성 */
router.post('/write', BoardController.insertBoard)
/* 게시글 수정 */
router.patch('/:boardId', BoardController.updateBoard)
/* 게시글 삭제 */
router.delete('/:boardId', BoardController.deleteBoard)

router.get('/list/:page', function(req, res, next) {
    var page = req.params.page;
    var sql = "select idx, name, title " +
        "from board";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('list', {title: '게시판 리스트', rows: rows});
    });
});

router.post('/write', function(req, res, next){
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var datas = [name, title, content];

    var sql = "insert into boardDb(name, title, content) values(?,?,?,now(), now(), ?, 0)";
    conn.query(sql, datas, function(err, rows){
        if(err) console.error("err: " + err);
        res.redirect('/board/list');
    });
});

router.post('/update', function(req, res, next){
    var idx = req.body.idx;
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var datas = [name, title, content, idx];

    var sql = "update boardDb set name=?, title=?, content=? where idx=?";
    conn.query(sql, datas, function(err, result){
        if(err) console.error(err);
        if(result.affectedRows == 0){
            res.send("<script>alert('패스워드가 일치하지 않습니다.'); history.back();</script)");
        }else{
            res.redirect('/board/list'+idx);
        }
    });
});

module.exports = router;
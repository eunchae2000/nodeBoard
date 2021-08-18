var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 게시판 메인 화면
router.get('/board', function(req, res, next) {
  res.render('board', { title: '게시판보기' });
});

// 게시판 글 작성하는 화면
router.get('/write', function(req, res, next) {
  res.render('boardNew', { title: '게시판 글 쓰기' });
});

// 게시판 글 목록을 보여주는 화면
router.get('/list', function(req, res, next){
  res.render('boardlist');
});

// 게시판 글 삭제하는 화면

// 게시판 글 수정하는 화면

// 게시판 글 상세보기 화면

module.exports = router;

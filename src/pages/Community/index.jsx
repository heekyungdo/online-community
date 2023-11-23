import React from "react";
import styles from "./community.module.css";

const Community = () => {
  return (
    <div>
      <div className={styles.notice}>
        <div className={styles.title}>
          <h5>자유게시판입니다.</h5>
        </div>
        <div className={styles.noticeDes}>
          <p>미풍양속을 해치지 않는 범위 내에서 자유롭게 작성해주세요.</p>
        </div>
      </div>
      <div className={styles.mainTable}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableTitle}>
              <th>번호</th>
              <th>글쓴이</th>
              <th>제목</th>
              <th>등록일</th>
              <th>조회</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>dfsd</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Community;

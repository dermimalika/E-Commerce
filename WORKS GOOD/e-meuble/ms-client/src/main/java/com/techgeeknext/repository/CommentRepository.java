package com.techgeeknext.repository;

import com.techgeeknext.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {

    Page<Comment>findByProductId(Long produtId, Pageable pageable);
    Optional<Comment> findByIdCommentAndProductId(Long id, Long productId);





}

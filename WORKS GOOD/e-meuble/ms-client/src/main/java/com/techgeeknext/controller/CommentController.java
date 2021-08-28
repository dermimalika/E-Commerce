package com.techgeeknext.controller;

import com.techgeeknext.model.Comment;
import com.techgeeknext.repository.CommentRepository;
import com.techgeeknext.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping(value = "/users")
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    ProductRepository productRepository;

    /*@GetMapping("/products/{productId}/comments")
    public Page<Comment> getAllCommentsByProductId(@PathVariable(value = "productId") Long productId, Pageable pageable){
        return commentRepository.findByProductId(productId,pageable);
    }*/

    @GetMapping("/products/{productId}/comments")
    public ResponseEntity<Map<String,Object>>getAllCommentsByProduct(@PathVariable(value = "productId") Long productId,@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "3") int size){
        try {
            List<Comment> Comments = new ArrayList<Comment>();
            Pageable paging= PageRequest.of(page,size);
            Page<Comment> pageComments = commentRepository.findByProductId(productId,paging);
            Comments=pageComments.getContent();

            Map<String,Object> response = new HashMap<>();
            response.put("Comments",Comments);
            response.put("CurrentPage",pageComments.getNumber());
            response.put("totalItems",pageComments.getTotalElements());
            response.put("totalPages",pageComments.getTotalPages());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/products/comments/{productId}")
    public Comment createComment(@PathVariable(value = "productId") Long productId,@Valid  @RequestBody Comment comment)
    {
        System.out.println("Product ID :"+productId);
        System.out.println("requestBody :"+comment.getComment());
        return productRepository.findById(productId).map(
                product -> {comment.setProduct(product);
                return commentRepository.save(comment) ;
                }).orElseThrow(()->new ResourceNotFoundException("ProductId" + productId + "not found"));
    }

    @PutMapping("/products/{productId}/comments/{commentId}")
    public Comment updateComment(@PathVariable(value = "productId") Long productId,
                                 @PathVariable(value = "commentId") Long commentId,
                                 @Valid @RequestBody Comment commentRequest){

        if(!productRepository.existsById(productId)){
            throw new ResourceNotFoundException("ProductID "+ productId + "not found!");
        }

        return commentRepository.findById(commentId).map(comment -> {
            comment.setComment(commentRequest.getComment());
            return commentRepository.save(comment);
        }).orElseThrow(()->new ResourceNotFoundException("CommentID " + commentId + "not found!"));
    }


    @DeleteMapping("/products/{productId}/comments/{commentId}")
    public ResponseEntity<?>deleteComment(@PathVariable(value = "productId" ) Long productId,
                                          @PathVariable(value = "commentId") Long commentId){
        return commentRepository.findByIdCommentAndProductId(commentId,productId).map(comment -> {
            commentRepository.delete(comment);
            return ResponseEntity.ok().build();
        }).orElseThrow(()->new ResourceNotFoundException("Comment Not Found with Id "+ commentId + "and Product " + productId));
    }

}

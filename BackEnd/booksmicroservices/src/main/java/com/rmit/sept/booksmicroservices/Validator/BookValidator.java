package com.rmit.sept.booksmicroservices.Validator;

import com.rmit.sept.booksmicroservices.Model.Book;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Locale;


@Component
public class BookValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return Book.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {
        Book book = (Book) object;

        if (book.getISBN().length() != 13) {
            errors.rejectValue("ISBN", "Length", "ISBN must be exactly 13 characters");
        }

        if (book.getPrice() < 0) {
            errors.rejectValue("Price", "Value", "Price must not be negative");
        }

        if (book.getPageCount() < 0) {
            errors.rejectValue("Page Count", "Value", "Page count must not be negative");
        }

        if (!(book.getCondition().equalsIgnoreCase("NEW")) && !(book.getCondition().equalsIgnoreCase("USED"))) {
            errors.rejectValue("Condition", "Value", "Condition can only be new or used");
        }
    }
}

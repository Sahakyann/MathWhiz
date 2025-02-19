from manim import *

class OpeningQuote(Scene):
    quote = []
    quote_arg_separator = " "
    highlighted_quote_terms = {}
    author = ""
    fade_in_kwargs = {
        "lag_ratio": 0.5,
        "rate_func": linear,
        "run_time": 5,
    }
    text_size = "\\Large"
    use_quotation_marks = True
    top_buff = 1.0
    author_buff = 1.0

    def construct(self):
        self.quote = self.get_quote()
        self.author = self.get_author(self.quote)

        self.play(FadeIn(self.quote, **self.fade_in_kwargs))
        self.wait(2)
        self.play(Write(self.author, run_time=3))
        self.wait()

    def get_quote(self, max_width=config.frame_width - 1):
        text_mobject_kwargs = {
            "arg_separator": self.quote_arg_separator,
        }
        
        if isinstance(self.quote, str):
            quote_text = f"`{self.quote.strip()}''" if self.use_quotation_marks else self.quote.strip()
            quote = Tex(quote_text, **text_mobject_kwargs)
        else:
            words = [self.text_size + " `"] + list(self.quote) + ["''"] if self.use_quotation_marks else [self.text_size] + list(self.quote)
            quote = Tex(*words, **text_mobject_kwargs)
            
            if self.quote_arg_separator == " ":
                quote[0].shift(0.2 * RIGHT)
                quote[-1].shift(0.2 * LEFT)
        
        for term, color in self.highlighted_quote_terms.items():
            quote.set_color_by_tex(term, color)
        
        quote.to_edge(UP, buff=self.top_buff)
        if quote.width > max_width:
            quote.set_width(max_width)
        
        return quote

    def get_author(self, quote):
        author_text = f"{self.text_size} -- {self.author}"
        author = Tex(author_text, color=YELLOW)
        author.next_to(quote, DOWN, buff=self.author_buff)
        return author

class CalculusOpening(OpeningQuote):
    quote = [
        "The art of doing mathematics is finding that", "special case",
        "that contains all the germs of generality."
    ]
    quote_arg_separator = " "
    highlighted_quote_terms = {
        "special case": BLUE
    }
    author = "David Hilbert"

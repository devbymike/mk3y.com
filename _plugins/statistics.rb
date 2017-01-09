require 'date' #needed to do date stuff
module Jekyll
  class RenderTotalWords < Liquid::Tag
 
    def render(context)
    #reg-ex to strip html
      re = /<("[^"]*"|'[^']*'|[^'">])*>/ 
      
      no_of_words = 0 
      no_of_days_writing = 0
      no_of_posts = 0
      no_of_words_per_day_written = 0
      
      date_start = Date.new(2009,12,23)
      date_end = DateTime.now
      
      no_of_days_writing = date_end - date_start
      no_of_days_writing = no_of_days_writing.to_i
      
      posts = context.registers[:site].posts
      
      posts.docs.each do |post|
        stripped_post = post.content.gsub(re,''); 
        no_of_words += stripped_post.gsub(/[^-a-zA-Z]/, ' ').split.size 
        no_of_posts += 1 
      end
      
      no_of_words_per_day_written = (no_of_words / no_of_posts).to_i

    ##print it out as a string - feel free to customise this to your hearts content.
      "<strong>~#{no_of_words}</strong>  Words Written In All Posts. <br><br> <strong>~#{no_of_days_writing}</strong>  Days Since The Start Of This Blog. <br><br> <strong>~#{no_of_posts}</strong> Posts Published Here, So Far.  <br><br> <strong>~#{no_of_words_per_day_written}</strong> Avg Words Written Per Day For This Blog. "
    end
  end #class ends here
end #module ends here

#register the custom template tag.
Liquid::Template.register_tag('content_statistics', Jekyll::RenderTotalWords)
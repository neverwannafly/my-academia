class Puzzle < ApplicationRecord
  before_save :assign_slug

  has_many :theme_associations, as: :associate

  MIN_RATING = 500
  SOLUTION_RESPONSE = {
    invalid_state: 0,
    incorrect: 1,
    correct: 2,
    solved: 3
  }

  def themes
    self.theme_associations.joins(:theme).select('themes.*')
  end

  def json_data
    {
      puzzle: self.as_json.merge({
        solution: Base64.encode64(self.solution)
      }),
      themes: self.themes.as_json
    }
  end

  def check_solution(move, index)
    puzzle_solution = self.solution.split(' ')
    return ::Puzzle::SOLUTION_RESPONSE[:invalid_state] if index >= puzzle_solution.length

    if puzzle_solution[index] == move
      if index == puzzle_solution.length
        return ::Puzzle::SOLUTION_RESPONSE[:solved]
      else
        return ::Puzzle::SOLUTION_RESPONSE[:correct]
      end
    else
      return ::Puzzle::SOLUTION_RESPONSE[:incorrect]
    end
  end

  def assign_slug
    slug = loop do
      slug = SecureRandom.alphanumeric(8)
      break slug unless self.class.exists?(slug: slug)
    end

    self.slug = slug
  end

  def self.random(strength: 1200, id_ceiling: nil)
    rating_deviation = 50
    low_rating = [strength - rating_deviation, ::Puzzle::MIN_RATING].max
    high_rating = [strength + rating_deviation, ::Puzzle::MIN_RATING + 3 * rating_deviation].max
    id_lower_ceiling = id_ceiling || self.random_puzzle_id_seed
    puzzle = self.where(rating: low_rating..high_rating, id: id_lower_ceiling..).first

    if puzzle.blank? and id_lower_ceiling > 0
      puzzle = self.get_random(strength: strength, id_ceiling: id_lower_ceiling/2)
    end

    puzzle
  end

  def self.random_puzzle_id_seed
    upper_ceiling = 80000
    upper_ceiling = 2000000 unless Rails.env.development?

    rand(0..upper_ceiling)
  end
end

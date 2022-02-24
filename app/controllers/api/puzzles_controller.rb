module Api
  class PuzzlesController < ApplicationController
    def show
      puzzle = Puzzle.find_by_slug(params[:slug])
      head :not_found and return if puzzle.blank?

      json_response puzzle.json_data
    end

    # Use it in maybe future when we have good servers
    def evaluate
      puzzle = Puzzle.find_by_slug(params[:slug])
      head :not_found and return if puzzle.blank?

      evaluation = puzzle.check_solution(solution_params)

      json_response({ evaluation: evaluation })
    end

    def random_puzzle 
      puzzle = Puzzle.random(strength: puzzle_strength)
      head :not_found and return if puzzle.blank?

      json_response puzzle.json_data
    end

    private

    def puzzle_strength
      if params[:strength].present?
        params[:strength].to_i
      else
        user_puzzle_rating
      end
    end

    def solution_params
      params.require(:puzzle).permit(:index, :move)
    end

    def user_puzzle_rating
      return nil if current_user.blank?

      user_rating = current_user.ratings.find_or_create_by(rating_type: :puzzle)
      user_rating.rating
    end
  end
end

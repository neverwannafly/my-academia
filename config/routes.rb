Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "home#index"

  namespace :api do
    resources :registrations, only: %i[create]
    resources :sessions, only: %i[create destroy]
    resources :health_check, only: %i[index]
    resources :evaluation, only: %i[index]

    namespace :puzzles do
      get 'random-puzzle', action: 'random_puzzle'
      post 'evaluate/:slug', action: 'evaluate'
      get ':slug', action: 'show'
    end
  end

  get "*any" => "home#index"
end
